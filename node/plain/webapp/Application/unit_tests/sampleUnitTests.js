var assert = require('assert');
var server = require('../server');
var http = require('http');
var fsMock = require('mock-fs');
 
describe('server', function () {
    before(function () {
        fsMock({
            'index.html': "hello world"
        });
        server.listen(8092);
    });
  
    after(function () {
        server.close();
        fsMock.restore();
    });

    it('should return 200', function (done) {
        http.get('http://localhost:8092', function (res) {
            assert.equal(200, res.statusCode);
            done();
        });
    });

    it('should read index.html', function (done) {
        http.get('http://localhost:8092', function (res) {
            assert.equal(200, res.statusCode);
            var data = '';

            res.on('data', function (chunk) {
                data += chunk;
            });

            res.on('end', function () {
                assert.equal('hello world', data);
                done();
            })
        });
    });
});