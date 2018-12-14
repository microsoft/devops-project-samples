'use strict';
var express = require('express');
var router = express.Router();
var redis = require('ioredis');
var dbOperations = require('../databaseOperations.js');
var utils = require('../utils.js');

var redisServer = process.env.redis_server || 'redis-cache';

console.log("Trying to create redis client");
var client = redis.createClient(6379, redisServer);

console.log("Redis Client created");
client.set('viewCount', 0);

/* GET home page. */
router.get('/', function (req, res) {
  dbOperations.addRecord("index", function(){
      dbOperations.queryCount(function (count) {
          res.render('index', {
              title: 'Express',
              count: count
          });
      }, function(error, code){utils.sendError(res, error, code);});
  }, function(error, code){utils.sendError(res, error, code);});
});

module.exports = router;
