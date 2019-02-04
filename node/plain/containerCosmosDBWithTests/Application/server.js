'use strict';
var http = require('http');
var jsdom = require('jsdom');
var { JSDOM } = jsdom;
var fs = require('fs');
var port = process.env.PORT || 8092;
var dbOperations = require('./databaseOperations.js');
var utils = require('./utils.js');

var appInsights = require('applicationinsights');
if(process.env.NODE_ENV == "production"){
    appInsights.setup();
    appInsights.start();
}

var server = http.createServer(function (req, res) {
    var reqUrl = req.url.replace(/^\/+|\/+$/g, '');
    if(!reqUrl || (!!reqUrl && (reqUrl == "" || reqUrl.toLowerCase() == "index.html"))){
        var data = fs.readFileSync('index.html');
        dbOperations.addRecord("index", function(){
            dbOperations.queryCount(function (visitCount){
                var dom = new JSDOM(`${data}`);
                var visitCountElement = dom.window.document.getElementById("visitCount");
                if(!!visitCountElement){
                    visitCountElement.innerHTML = "Total visits: " + visitCount;
                    data = dom.serialize();
                }
                utils.writeResponse(res, data);
            }, function(error){
                utils.writeResponse(res, data);
            });
        }, function(error){
            utils.writeResponse(res, data);
        });
    }
    else if(reqUrl.toLowerCase() == "users"){
        utils.writeResponse(res, "respond with a resource");
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
        res.writeHead(200, { 'Content-Type': contentType, 'Content-Length': data.length });
        res.write(data);
        res.end();
    }
    else {
        utils.writeResponse(res, "not found");
    }
});

exports.listen = function () {
    server.listen.apply(server, arguments);
};
  
exports.close = function (callback) {
    server.close(callback);
};

server.listen(port);
