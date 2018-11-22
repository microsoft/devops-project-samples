var MongoClient = require("mongodb").MongoClient;
var Db = require("mongodb").Db;
var fs = require('fs');
var assert = require('assert');
var obj = JSON.parse(fs.readFileSync('connectionData.json', 'utf8'));

var connectionString = obj.connectionString;
var stringSplit1 = connectionString.split("://")[1];
var stringSplit2 = stringSplit1.split('@');
var userNamePassword = stringSplit2[0];
userNamePassword = userNamePassword.split(':');
var userName = userNamePassword[0];
var password = userNamePassword[1];
var databaseName = obj.databaseName;
var collectionName = obj.collectionName;
connectionString = ("mongodb://" + encodeURIComponent(userName) + ":" + encodeURIComponent(password) + "@" + stringSplit2[1]);

var HttpStatusCodes = { NOTFOUND: 404 };

module.exports = {

    insertDocument: function (db, itemBody, callback) {
        // Get the documents collection
        const collection = db.collection(collectionName);
        // Insert some documents
        collection.insertMany([
            itemBody
        ], function (err, result) {
            assert.equal(err, null);
            assert.equal(1, result.result.n);
            assert.equal(1, result.ops.length);
            console.log("Inserted 1 document into the collection");
            callback();
        });
    },

    findDocuments: function (db, callback) {
        // Get the documents collection
        const collection = db.collection(collectionName);
        // Find some documents
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log(`Found ${docs.length} records`);
            callback(docs.length);
        });
    },

    /**
     * Query the container using SQL
     */
    queryContainer: function (callback) {
        console.log(`Querying container:\n${collectionName}`);
        MongoClient.connect(connectionString, function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            var db = client.db(databaseName);
            module.exports.findDocuments(db, function(count) {
                client.close();
                callback(count);
            });
        });
    },

    addRecord: function(pageName){
        var milliseconds = (new Date).getTime().toString();
        var itemBody = {
            "id": milliseconds,
            "page": pageName
        };
        console.log(`connectionString is ${connectionString}`);
        MongoClient.connect(connectionString, function(err, client) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            var db = client.db(databaseName);
            module.exports.insertDocument(db, itemBody, function() {
                client.close();
            });
        });
    }
}