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

module.exports = router;
