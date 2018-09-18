import pytest
import sys
import os
import unittest
import bottle

app_dir_path = os.path.join(os.getcwd(), 'Application')
sys.path.append(app_dir_path)
bottle.TEMPLATE_PATH.insert(0, os.path.join(app_dir_path, 'views'))
import routes

class ViewTests(unittest.TestCase):
	"""Tests for the application views."""

	def test_unit_home(self):
		html_source = routes.home()
		self.assertIn('<title>Home Page - Python Bottle Application</title>', html_source)

	def test_unit_contact(self):
		html_source = routes.contact()
		self.assertIn('<title>Contact - Python Bottle Application</title>', html_source)

	def test_unit_about(self):
		html_source = routes.about()
		self.assertIn('<title>About - Python Bottle Application</title>', html_source)