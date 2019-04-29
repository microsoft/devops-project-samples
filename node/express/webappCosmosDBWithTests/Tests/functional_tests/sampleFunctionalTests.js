const process = require('process');
const webdriver = require('selenium-webdriver');
const {until} = require('selenium-webdriver');

process.env['Path'] = process.env['Path'] + ';' + process.env['ChromeWebDriver'];

describe('sampleFunctionalTests', function () {
	this.timeout(120000);

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

    var numRetries = 5;
	for (var i = 0; i < numRetries; i++)
    {
		it('Assert page title', (done) => {
			driver.get(process.env['webAppUrl']).then(() => {
				return driver.wait(until.titleIs('Express - Node.js Express Application'), 2000);
			})
			.then(() => 
			{
				done();
				break;
			})
			.catch((err) => {
				if(i == (numRetries - 1))
				{
					done('Failed with error ' + err);
				}
			});
		});
	}
});