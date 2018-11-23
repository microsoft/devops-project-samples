'use strict';
var http = require('http');
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var MongoClient = require("mongodb").MongoClient;
var assert = require('assert');
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

function insertDocument(db, itemBody, callback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Insert some documents
    collection.insertMany([
        itemBody
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        assert.equal(1, result.ops.length);
        console.log("Inserted 1 document into the collection");
        callback();
    });
}

function findDocuments(db, callback) {
    // Get the documents collection
    const collection = db.collection(collectionName);
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log(`Found ${docs.length} records`);
        callback(docs.length);
    });
}

/**
 * Query the container using SQL
 */
function queryContainer(callback) {
    console.log(`Querying container:\n${collectionName}`);
    MongoClient.connect(connectionString, function (err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var db = client.db(databaseName);
        findDocuments(db, function (count) {
            client.close();
            callback(count);
        });
    });
}

function addRecord(pageName) {
    var milliseconds = (new Date).getTime().toString();
    var itemBody = {
        "id": milliseconds,
        "page": pageName
    };
    MongoClient.connect(connectionString, function (err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var db = client.db(databaseName);
        insertDocument(db, itemBody, function () {
            client.close();
        });
    });
}

http.createServer(function (req, res) {

    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        addRecord("index");
        queryContainer(function (visitCount){
            var dom = new JSDOM(`${data}`);
            dom.window.document.getElementById("visitCount").innerHTML = visitCount;
            res.write(dom.serialize());
            res.end();
        });
    });
}).listen(port);
