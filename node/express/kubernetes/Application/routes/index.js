'use strict';
var express = require('express');
var router = express.Router();
var redis = require('ioredis');

console.log("trying to create redis client");
var redisServer = process.env.redis_server || 'redis-cache';
console.log(redisServer);
var client = redis.createClient(6379, redisServer);
console.log("redis client created");
client.set('foo', 'bar');

/* GET home page. */
router.get('/', function (req, res) {
    console.log("Index route");
    client.get('foo', function (err, result) {
      console.log('ioredis get completed');  
      console.log(result);
      res.render('index', { title: result });
    });     
});

module.exports = router;
