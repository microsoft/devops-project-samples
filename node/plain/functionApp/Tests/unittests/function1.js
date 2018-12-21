var assert = require('assert');

module.exports = {
	runWithParams: function() {
		var azfunction = require('./../../Application/Function1/index.js');
		var mockReq = {
			"query": {
			},
			"body": {
				"name": "Bill"
			}
		};
		var mockContext = {
			log: function(a){}
		};

		azfunction(mockContext, mockReq).then((res) => {
			assert(mockContext.res.body == 'Hello Bill! Welcome to Azure Functions!');
		});
	},

	runWithoutParams: function() {
		var azfunction = require('./../../Application/Function1/index.js');
		var mockReq = {
			"query": {},
			"body": {}
		};
		var mockContext = {
			log: function(a){}
		};

		azfunction(mockContext, mockReq).then((res) => {
			assert(mockContext.res.body == 'Hello there! Welcome to Azure Functions!');
		});
	}
}