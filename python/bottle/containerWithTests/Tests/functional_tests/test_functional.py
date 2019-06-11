import pytest
from selenium import webdriver
import unittest
import os
import sys
import pytest
import time

class FunctionalTests(unittest.TestCase):

	def setUp(self):
		options = webdriver.ChromeOptions()
		options.add_argument('--no-sandbox')
		self.driver = webdriver.Chrome(os.path.join(os.environ["ChromeWebDriver"], 'chromedriver.exe'), chrome_options=options)
		self.driver.implicitly_wait(120)

	def test_selenium(self):
		webAppUrl = pytest.config.getoption('webAppUrl')
		start_timestamp = time.time()
		end_timestamp = start_timestamp + 60*10		
		while True:
			try:
				response = self.driver.get(webAppUrl)
				title = self.driver.title
				self.assertIn("Home Page - Python Bottle Application", title)
				break
			except AssertionError:
				current_timestamp = time.time()
				if(current_timestamp > end_timestamp):
					raise
				time.sleep(5)
			except Exception as e:
				pytest.fail('tests_selenium.Error occurred while executing tests: ' + str(e))

	def tearDown(self):
		try:
			self.driver.quit()
		except Exception as e:
			print('tearDown.Error occurred while trying to close the selenium chrome driver: ' + str(e))
