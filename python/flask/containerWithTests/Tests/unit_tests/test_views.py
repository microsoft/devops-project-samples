import pytest
import unittest
import os
import sys

sys.path.append(os.path.join(os.getcwd(), 'Application'))
os.environ["APPINSIGHTS_INSTRUMENTATIONKEY"] = os.path.join(os.getcwd(), 'Application')
from python_webapp_flask import app

class ViewTest(unittest.TestCase):

	def setUp(self):
		app.config['TESTING'] = True
		self.app = app.test_client()

	def test_unit_home(self):
		response = self.app.get('/')
		self.assertEqual(response.status_code, 200)

	def test_unit_contact(self):
		response = self.app.get('/contact')
		self.assertEqual(response.status_code, 200)

	def test_unit_about(self):
		response = self.app.get('/about')
		self.assertEqual(response.status_code, 200)

