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
  client.exists('viewCount',function(err,reply) {
        if(!err) {
            if(reply === 1) {
                client.incr('viewCount', (err, incrementedValue) => {
                  if (err) {
                  console.log(err);
                  return;
                }
                res.render('index', { message: "Total Visits: " + incrementedValue }); 
                });
            } else {
                client.set('viewCount', 1)
            }
        }
    });
});

module.exports = router;
