'use strict';
var http = require('http');
var port = process.env.PORT || 8092;
var fs = require('fs');

var appInsights = require('applicationinsights');
if(process.env.NODE_ENV == "production"){
    appInsights.setup();
    appInsights.start();
}

var server = http.createServer(function (req, res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    });
});

exports.listen = function () {
    server.listen.apply(server, arguments);
};
  
exports.close = function (callback) {
    server.close(callback);
};

server.listen(port);