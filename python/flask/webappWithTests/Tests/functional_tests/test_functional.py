import pytest
from selenium import webdriver
import unittest
import os
import sys
import pytest

class FunctionalTests(unittest.TestCase):

	def setUp(self):
		options = webdriver.ChromeOptions()
		options.add_argument('--no-sandbox')
		self.driver = webdriver.Chrome(os.path.join(os.environ["ChromeWebDriver"], 'chromedriver.exe'), chrome_options=options)

	def test_selenium(self):
		try:
			webAppUrl = pytest.config.getoption('webAppUrl')
			response = self.driver.get(webAppUrl)
			title = self.driver.title
			self.assertIn("Home Page - Python Flask Application", title)
		except AssertionError:
			raise
		except Exception as e:
			pytest.fail('tests_selenium.Error occurred while executing tests: ' + str(e))

	def tearDown(self):
		try:
			self.driver.quit()
		except Exception as e:
			print('tearDown.Error occurred while trying to close the selenium chrome driver: ' + str(e))
