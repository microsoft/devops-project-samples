'use strict';
var express = require('express');
var router = express.Router();
var dbOperations = require('../databaseOperations.js');
var utils = require('../utils.js');

/* GET users listing. */
router.get('/', function (req, res) {
    dbOperations.addRecord("users", function () {
        res.send('respond with a resource');
    }, function (error, code) {
        utils.sendError(res, error, code);
    });
});

module.exports = router;
