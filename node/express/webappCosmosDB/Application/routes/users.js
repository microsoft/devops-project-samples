'use strict';
var express = require('express');
var router = express.Router();
var dbOperations = require('./databaseOperations.js');

/* GET users listing. */
router.get('/', function (req, res) {
    await dbOperations.addRecord("users");
    res.send('respond with a resource');
});

module.exports = router;
