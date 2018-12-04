'use strict';
var express = require('express');
var router = express.Router();
var redis = require('ioredis');

var redisServer = process.env.redis_server || 'redis-cache';

console.log("Trying to create redis client");
var client = redis.createClient(6379, redisServer);

console.log("Redis Client created");

/* GET home page. */
router.get('/', function (req, res) {
  console.log("Index route");
  client.incr('viewCount', function (err, result) {
    res.render('index', { message: "Total Visits: " + result });
  });
});

module.exports = router;
