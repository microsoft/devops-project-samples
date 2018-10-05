import pytest

def pytest_addoption(parser):
	parser.addoption(
    "--webAppUrl", action="store") 