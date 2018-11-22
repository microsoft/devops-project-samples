'use strict';
var express = require('express');
var router = express.Router();
var dbOperations = require('./databaseOperations.js');

/* GET home page. */
router.get('/', function (req, res) {
    dbOperations.addRecord("index");
    var count = dbOperations.queryContainer(function (count) {
        res.render('index', {
            title: 'Express',
            count: count
        });
    });
});

module.exports = router;
