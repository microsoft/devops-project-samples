import pytest
import sys
import os
import unittest

app_dir_path = os.path.join(os.getcwd(), 'Application/Function1')
sys.path.append(app_dir_path)
import __init__

class Request:
        def __init__(self):
                self.params = {}
                
        def get_json(self):
                return self.params

def test_response_with_param():
        req = Request()
        req.params['name'] = "Bill"
        response = __init__.main(req)
        assert response.status_code==200
        assert response.get_body()==b"Hello Bill! Welcome to Azure Functions!"

        
def test_response_without_param():
        req = Request()
        response = __init__.main(req)
        assert response.status_code==200
        assert response.get_body()==b"Hello! Welcome to Azure Functions!"
