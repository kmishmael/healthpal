from flask_login import LoginManager
from .instance import app

login = LoginManager(app)
login.login_view = 'signin'
