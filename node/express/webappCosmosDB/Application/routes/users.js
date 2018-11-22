'use strict';
var express = require('express');
var router = express.Router();
var dbOperations = require('./databaseOperations.js');

/* GET users listing. */
router.get('/', async function (req, res) {
    dbOperations.addRecord("users");
    res.send('respond with a resource');
});

module.exports = router;
