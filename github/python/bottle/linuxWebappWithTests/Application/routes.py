"""
Routes and views for the bottle application.
"""

from bottle import route, view, get, static_file
from datetime import datetime

@route('/')
@route('/home')
@view('index')
def home():
    """Renders the home page."""
    return dict(
        year=datetime.now().year
    )

@route('/contact')
@view('contact')
def contact():
    """Renders the contact page."""
    return dict(
        title='Contact',
        message='Your contact page.',
        year=datetime.now().year
    )

@route('/about')
@view('about')
def about():
    """Renders the about page."""
    return dict(
        title='About',
        message='Your application description page.',
        year=datetime.now().year
    )

@get("/static/img/<filepath:re:.*\.(jpg|png|gif|ico|svg)>")
def img(filepath):
    return static_file(filepath, root="./static/img")

@get("/static/scripts/<filepath:re:.*\.js>")
def js(filepath):
    return static_file(filepath, root="./static/scripts")

@get("/static/content/<filepath:re:.*\.css>")  
def css(filepath):
    return static_file(filepath, root="./static/content")

@get("/static/fonts/<filepath:re:.*\.(eot|otf|svg|ttf|woff|woff2?)>")
def fonts(filepath):
    return static_file(filepath, root="./static/fonts")