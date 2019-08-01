const process = require('process');
const webdriver = require('selenium-webdriver');
const {until} = require('selenium-webdriver');

process.env['Path'] = process.env['Path'] + ';' + process.env['ChromeWebDriver'];

describe('sampleFunctionalTests', function () {
	this.timeout(0);

	let driver;
	var capabilities = webdriver.Capabilities.chrome();
	capabilities.set('chromeOptions', {'args': ['--no-sandbox']});

	before(async () => {
		driver = new webdriver.Builder()
			.forBrowser('chrome')
			.withCapabilities(capabilities)
			.build();
			await driver.manage().setTimeouts({pageLoad: 300000});
	})

    after((done) => {
		driver.quit()
			.then(() => done())
			.catch(() => {
				done();
			});
    });

	it('Assert page title', async() => {
		var startTimestamp = Date.now()
		var endTimestamp = startTimestamp + 60*10*1000;
		while(true)
    	{
			try
			{
				await driver.get(process.env['webAppUrl']);
				await driver.wait(until.titleIs('Node.js Application'), 2000);
				break;
			}
			catch(err)
			{
				var currentTimestamp = Date.now()
				if(currentTimestamp > endTimestamp)
				{
					console.log("##vso[task.logissue type=error;]Failed with error " + err)
					throw new Error('Failed with error ' + err);
				}
				await new Promise(resolve=>{
					setTimeout(resolve,5000)
				});
			}
		}
	});
});