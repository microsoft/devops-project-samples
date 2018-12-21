var tests = require('require-dir')('./unittests');

for (var azfunc in tests) {
	for (var function2 in tests[azfunc]) {
    		tests[azfunc][function2]();
	}
}