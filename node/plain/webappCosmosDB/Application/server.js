'use strict';
var http = require('http');
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var MongoClient = require("mongodb").MongoClient;
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('connectionData.json', 'utf8'));
var port = process.env.PORT || 8092;

var connectionString = obj.connectionString;
var stringSplit1 = connectionString.split("://")[1];
var stringSplit2 = stringSplit1.split('@');
var userNamePassword = stringSplit2[0];
userNamePassword = userNamePassword.split(':');
var userName = userNamePassword[0];
var password = userNamePassword[1];
var databaseName = obj.databaseName;
var collectionName = obj.collectionName;
connectionString = ("mongodb://" + encodeURIComponent(userName) + ":" + encodeURIComponent(password) + "@" + stringSplit2[1]);

function insertDocument(db, itemBody, callback, errorCallback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany([
        itemBody
    ], function (err, result) {
        if(err != null){
            errorCallback(err, 500)
        }
        if(result.ops.length == 1){
            console.log("Inserted 1 document into the collection");
        }
        callback();
    });
}

function findDocuments(db, callback, errorCallback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Find some documents
    collection.count(function (err, count) {
        if(err != null){
            errorCallback(err, 500)
        }
        console.log(`Found ${count} records`);
        callback(count);
    });
}

/**
 * Query the number of documents
 */
function queryCount(callback,errorCallback) {
    console.log(`Querying container:\n${collectionName}`);
    MongoClient.connect(connectionString, function (err, client) {
        if(err != null){
            errorCallback(err, 500);
            return;
        }
        console.log("Connected correctly to server");
        var db = client.db(databaseName);
        findDocuments(db, function (count) {
            callback(count);
            client.close();
        }, errorCallback);
    });
}

function addRecord(pageName, callback, errorCallback) {
    var milliseconds = (new Date).getTime().toString();
    var itemBody = {
        "id": milliseconds,
        "page": pageName
    };
    MongoClient.connect(connectionString, function (err, client) {
        if(err != null){
            errorCallback(err, 500);
            return;
        }
        console.log("Connected correctly to server");
        var db = client.db(databaseName);
        insertDocument(db, itemBody, function () {
            callback();
            client.close();
        }, errorCallback);
    });
}

function sendError(res, data, code){
    res.writeHead(code, { 'Content-Type': 'text/html', 'Content-Length': data.length });
    res.write(data);
    res.end();
}

http.createServer(function (req, res) {
    var reqUrl = req.url.replace(/^\/+|\/+$/g, '');
    if(!reqUrl || (!!reqUrl && (reqUrl == "" || reqUrl.toLowerCase() == "index.html"))){
        var data = fs.readFileSync('index.html');
        addRecord("index", function(){
            queryCount(function (visitCount){
                var dom = new JSDOM(`${data}`);
                dom.window.document.getElementById("visitCount").innerHTML = visitCount;
                data = dom.serialize()
                res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
                res.write(data);
                res.end();
            }, function(error, code){sendError(res, error, code);});
        }, function(error, code){sendError(res, error, code);});
    }
    else if (reqUrl.toLowerCase() == "favicon.ico"){
        data = fs.readFileSync("img/successCloudNew.svg");
        res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Content-Length': data.length });
        res.write(data);
        res.end();
    }
    else if (fs.existsSync(reqUrl)) {
        var contentType = "text/plain";
        data = fs.readFileSync(reqUrl);
        switch(reqUrl.split('.').pop()){
            case "css":
                contentType = "text/css";
                break;
            case "ttf":
                contentType = "font/ttf";
                break;
            case "svg":
                contentType = "image/svg+xml";
                break;
        }
        res.writeHead(200, { 'Content-Type': 'image/svg+xml', 'Content-Length': data.length });
        res.write(data);
        res.end();
    }
    else {
        sendError(res, "not found", 404);
    }
}).listen(port);
