var tests = require('require-dir')('./unittests');

for (var functions in tests) {
	for (var testmethods in tests[functions]) {
    		tests[functions][testmethods]();
	}
}