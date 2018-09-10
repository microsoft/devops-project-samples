"""
This file demonstrates writing functional tests.
"""
import django
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from django.test import TestCase
import os
import sys
import pytest

sys.path.append(os.path.join(os.getcwd(), 'Application'))
os.environ.setdefault(
    "DJANGO_SETTINGS_MODULE",
    "python_webapp_django.settings"
)
django.setup()

class FunctionalTests(TestCase):

    def setUp(self):
        options = webdriver.ChromeOptions()
        options.add_argument('--no-sandbox')
        self.driver = webdriver.Chrome(os.environ["ChromeWebDriver"], chrome_options=options)

    def test_selenium(self):
        try:
            webAppUrl = pytest.config.getoption('webAppUrl')
            response = self.driver.get(webAppUrl)
            html_source = self.driver.page_source
            self.assertIn("<title>Home Page - Python Django Application</title>", html_source)
        except AssertionError:
            raise
        except Exception as e:
            sys.stderr.write('tests_selenium.Error occurred : ' + str(e))
            self.driver.quit()

    def tearDown(self):
        try:
            self.driver.quit()
        except Exception as e:
            print('tearDown.Error occurred : ' + str(e))