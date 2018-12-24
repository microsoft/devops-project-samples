var gulp = require('gulp');
var ncp = require('child_process');

gulp.task("unittest", () => {
    var output;
    try {
        output = ncp.execSync('npm test unit_tests/*.js', null);
    }
    catch (err) {
        process.exit(1);
    }
})