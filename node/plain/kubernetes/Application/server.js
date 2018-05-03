'use strict';
var http = require('http');
var port = process.env.PORT || 8080;
var fs = require('fs');
const appInsights = require('applicationinsights');
appInsights.setup();
appInsights.start();

http.createServer(function (req, res) {
    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    });
}).listen(port);