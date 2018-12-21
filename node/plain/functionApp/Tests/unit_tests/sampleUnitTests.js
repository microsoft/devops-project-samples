var assert = require('assert');
var azfunction = require('../../Application/Function1/index.js');
 
describe('sampleUnitTests', function () {
    before(function () {

    });
  
    after(function () {

    });

    it('Should work with params', function (done) {
        var mockContext = {
			log: function(a){}
        };
        
        var mockRequest = {
			"query": {
			},
			"body": {
                "name": "Bill"
			}
		};
        azfunction(mockContext, mockRequest).then((result) => {
            assert.equal('200', mockContext.res.status, 'Response code should be 200');
            assert.equal('Hello Bill! Welcome to Azure Functions!', mockContext.res.body, 'Response body is incorrect');
            done();
        }).catch((error) => {
            done(error);
        });
    });

    it('Should work without params', function (done) {
        var mockContext = {
			log: function(a){}
        };
        
        var mockRequest = {
			"query": {
			},
			"body": {
			}
		};
        azfunction(mockContext, mockRequest).then((result) => {
            assert.equal('200', mockContext.res.status, 'Response code should be 200');
            assert.equal('Hello there! Welcome to Azure Functions!', mockContext.res.body, 'Response body is incorrect');
            done();
        }).catch((error) => {
            done(error);
        });
    });

});