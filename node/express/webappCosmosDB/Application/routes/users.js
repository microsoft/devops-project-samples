'use strict';
var express = require('express');
var router = express.Router();
var dbOperations = require('../databaseOperations.js');

/* GET users listing. */
router.get('/', function (req, res) {
    dbOperations.addRecord("users", function (){res.send('respond with a resource');}, function(error, code){sendError(res, error, code);});
});

module.exports = router;
