'use strict';
var http = require('http');
var port = process.env.PORT || 8092;
var fs = require('fs');

http.createServer(function (req, res) {

    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    });
}).listen(port);
