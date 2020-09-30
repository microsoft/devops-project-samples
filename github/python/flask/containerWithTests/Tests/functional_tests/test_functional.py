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
		self.driver.implicitly_wait(300)

	def test_selenium(self):
		webAppUrl = pytest.config.getoption('webAppUrl')
		start_timestamp = time.time()
		end_timestamp = start_timestamp + 60*10
		while True:
			try:
				response = self.driver.get(webAppUrl)
				title = self.driver.title
				self.assertIn("Home Page - Python Flask Application", title)
				break
			except Exception as e:
				print('"##vso[task.logissue type=error;]Test test_selenium failed with error: ' + str(e))
				current_timestamp = time.time()
				if(current_timestamp > end_timestamp):
					raise
				time.sleep(5)

	def tearDown(self):
		try:
			self.driver.quit()
		except Exception as e:
			print('tearDown.Error occurred while trying to close the selenium chrome driver: ' + str(e))
