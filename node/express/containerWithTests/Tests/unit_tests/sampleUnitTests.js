var assert = require('assert');
var app = require('../../Application/app');
var http = require('http');
 
describe('sampleUnitTests', function () {
    before(function () {
    });
  
    after(function () {
        app.close();
    });

    it('Should return 200', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode, 'Result code should be 200.');
            done();
        });
    });

    it('Assert title', function (done) {
        http.get('http://localhost:3000', function (res) {
            assert.equal(200, res.statusCode, 'Result code should be 200.');
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                assert.equal(true, data.includes('<title>Express - Node.js Express Application</title>'), 'Title should be Express - Node.js Express Application.');
                done();
            })
        });
    });
});