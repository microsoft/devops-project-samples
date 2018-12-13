const process = require('process');
const webdriver = require('selenium-webdriver');
const {until} = require('selenium-webdriver');

process.env['Path'] = process.env['Path'] + ';' + process.env['ChromeWebDriver'];

describe('sampleFunctionalTests', function () {
	this.timeout(180000);

	let driver;
	var capabilities = webdriver.Capabilities.chrome();
	capabilities.set('chromeOptions', {'args': ['--no-sandbox']});

	before(() => {
		driver = new webdriver.Builder()
			.forBrowser('chrome')
			.withCapabilities(capabilities)
			.build();
	})

    after((done) => {
		driver.quit()
			.then(() => done())
			.catch(() => {
				done();
			});
    });

    it('Assert page title', (done) => {
		driver.get(process.env['webAppUrl']).then(() => {
			return driver.wait(until.titleIs('Node.js Application'), 2000);
		})
		.then(() => done())
		.catch((err) => {
			done('Failed with error ' + err);
		});
    });
});