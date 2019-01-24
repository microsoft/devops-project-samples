var MongoClient = require("mongodb").MongoClient;
var fs = require('fs');
var obj = {
    "databaseName": "sampledatabase",
    "collectionName": "samplecollection"
};

var connectionString = "mongodb://account:key@account.documents.azure.com:10255/?ssl=true";
if(process.env.NODE_ENV == "production"){
    var connectionString = process.env.connectionString;
    var stringSplit1 = connectionString.split("://")[1];
    var stringSplit2 = stringSplit1.split('@');
    var userNamePassword = stringSplit2[0];
    userNamePassword = userNamePassword.split(':');
    var userName = userNamePassword[0];
    var password = userNamePassword[1];
    var databaseName = obj.databaseName;
    var collectionName = obj.collectionName;
    connectionString = ("mongodb://" + encodeURIComponent(userName) + ":" + encodeURIComponent(password) + "@" + stringSplit2[1]);
}
else{
    MongoClient =  {
        connect: function(connectionString, options, callback){
            var client = {
                db: function(databaseName){
                    var testDB = {
                        collection: function(collectionName){
                            var testCollection = {
                                count: function(callback){
                                    callback(null, "unittest");
                                },
                                insertMany: function(items, callback){
                                    callback(null, "success");
                                }
                            }
                            return testCollection;
                        }
                    }
                    return testDB;
                },
                close: function(){
                    
                }
            }
            callback(null, client);
        }
    };
}

module.exports = {

    queryCount: function (callback, errorCallback) {
        console.log(`Querying container:\n${collectionName}`);
        MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
            if (err != null) {
                errorCallback(err);
                return;
            }
            console.log("Connected correctly to server");
            var db = client.db(databaseName);
            // Get the documents collection
            const collection = db.collection(collectionName);
            // Find some documents
            collection.count(function (err, count) {
                if (err != null) {
                    errorCallback(err)
                }
                console.log(`Found ${count} records`);
                callback(count);
                client.close();
            });
        });
    },

    addRecord: function (pageName, callback, errorCallback) {
        var milliseconds = (new Date).getTime().toString();
        var itemBody = {
            "id": milliseconds,
            "page": pageName
        };
        MongoClient.connect(connectionString, { useNewUrlParser: true }, function (err, client) {
            if (err != null) {
                errorCallback(err);
                return;
            }
            console.log("Connected correctly to server");
            var db = client.db(databaseName);
            // Get the documents collection
            const collection = db.collection(collectionName);
            // Insert some documents
            collection.insertMany([itemBody], function (err, result) {
                if (err != null) {
                    errorCallback(err)
                }
                callback();
                client.close();
            });
        });
    }
}