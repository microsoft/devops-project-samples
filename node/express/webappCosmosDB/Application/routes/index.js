'use strict';
var express = require('express');
var router = express.Router();
var dbOperations = require('./databaseOperations.js');

/* GET home page. */
router.get('/', function (req, res) {
    await dbOperations.addRecord("index");
    var count = await dbOperations.queryContainer();
    res.render('index', { 
        title: 'Express',
        count: count
    });
});

module.exports = router;
