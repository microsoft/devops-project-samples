'use strict';
var http = require('http');
var port = process.env.PORT || 8080;
var fs = require('fs');
const appInsights = require('applicationinsights');
appInsights.setup();
appInsights.start();

var redis = require('ioredis');

console.log("trying to create redis client");
var redisServer = process.env.redis_server || 'redis-cache';
console.log(redisServer);
var client = redis.createClient(6379, redisServer);
console.log("redis client created");
client.set('foo', 'barplain');

console.log("Index route");
client.get('foo', function (err, result) {
    console.log('ioredis get completed');  
    console.log(result);
});     


http.createServer(function (req, res) {

    fs.readFile('index.html', function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
        res.write(data);
        res.end();
    });
}).listen(port);