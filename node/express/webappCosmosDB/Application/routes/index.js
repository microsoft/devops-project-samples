'use strict';
var express = require('express');
var router = express.Router();
var dbOperations = require('../databaseOperations.js');

/* GET home page. */
router.get('/', function (req, res) {
    dbOperations.addRecord("index", function(){
        dbOperations.queryCount(function (count) {
            res.render('index', {
                title: 'Express',
                count: count
            });
        }, function(error, code){sendError(res, error, code);});
    }, function(error, code){sendError(res, error, code);});
});

module.exports = router;
