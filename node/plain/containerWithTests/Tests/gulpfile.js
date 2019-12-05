var gulp = require('gulp');
var ncp = require('child_process');

gulp.task("unittest", (done) => {
    var options = {
        stdio: 'inherit'
    };

    var output;
    try {
        output = ncp.execSync('npm test unit_tests/*.js', options);
    }
    catch (err) {
        done();
        process.exit(1);
    }

    done();
})

gulp.task("functionaltest", (done) => {
    var webAppUrl, indexOfWebAppUrlOption = process.argv.indexOf("--webAppUrl");
    if (indexOfWebAppUrlOption > -1) {
        webAppUrl = process.argv[indexOfWebAppUrlOption + 1];
    }

    process.env['webAppUrl'] = webAppUrl;
    var options = {
        stdio: 'inherit'
    };

    var output;
    try {
        output = ncp.execSync('npm test functional_tests/*.js', options);
    }
    catch (err) {
        done();
        process.exit(1);
    }

    done();
})
