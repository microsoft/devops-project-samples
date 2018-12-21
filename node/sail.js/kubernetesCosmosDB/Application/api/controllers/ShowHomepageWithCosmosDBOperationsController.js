var dbOperations =  require('../helpers/databaseOperations.js');

module.exports = {
    showHomepageWithCosmosDBOperations: async function (req, res) {
        dbOperations.addRecord("index", function () {
            dbOperations.queryCount(function (count) {
                res.view('homepage', {
                    visitCount: count
                });
            }, function (error) {
                res.view('500', {
                    data: error
                });
            });
        }, function (error) {
            res.view('500', {
                data: error
            });
        });
    }
}