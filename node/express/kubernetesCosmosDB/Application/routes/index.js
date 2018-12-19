'use strict';
var express = require('express');
var router = express.Router();
var redis = require('ioredis');
var dbOperations = require('../databaseOperations.js');

var redisServer = process.env.redis_server || 'redis-cache';

console.log("Trying to create redis client");
var client = redis.createClient(6379, redisServer);

console.log("Redis Client created");

/* GET home page. */
router.get('/', function (req, res) {
  console.log("Index route");
  client.incr('viewCount', function (err, result) {
    dbOperations.addRecord("index", function(){
        dbOperations.queryCount(function (count) {
            res.render('index', {
                title: 'Express',
                count: count,
                message: "Redis count: " + result
            });
        }, function(error){
            res.render('error', {
                title: 'Express',
                error: error
            });
        });
    }, function(error){
        res.render('error', {
            title: 'Express',
            error: error
        });
    });
  });
});

module.exports = router;
