const process = require('process');
const webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');

process.env['Path'] = process.env['Path'] + ';' + process.env['ChromeWebDriver'];

(async function example() {
  let driver = await new Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
  try {
    await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } finally {
    await driver.quit();
  }
})();