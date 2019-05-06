const process = require('process');
const webdriver = require('selenium-webdriver');
const {until} = require('selenium-webdriver');

process.env['Path'] = process.env['Path'] + ';' + process.env['ChromeWebDriver'];

describe('sampleFunctionalTests', function () {
	this.timeout(600000);

	let driver;
	var capabilities = webdriver.Capabilities.chrome();
	capabilities.set('chromeOptions', {'args': ['--no-sandbox']});

	before(async () => {
		driver = new webdriver.Builder()
			.forBrowser('chrome')
			.withCapabilities(capabilities)
			.build();
			await driver.manage().setTimeouts({pageLoad: 120000});
	})

    after((done) => {
		driver.quit()
			.then(() => done())
			.catch(() => {
				done();
			});
    });

	it('Assert page title', async() => {
		var numRetries = 5;
		for (var i = 0; i < numRetries; i++)
    	{
			try
			{
				await driver.get(process.env['webAppUrl']);
				await driver.wait(until.titleIs('Sails Application'), 2000);
			}
			catch(err)
			{
				if(i == (numRetries - 1))
				{
					throw new Error('Failed with error ' + err);
				}
				await new Promise(resolve=>{
					setTimeout(resolve,5000)
				});
			}
		}
	});
});