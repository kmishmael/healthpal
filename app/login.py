from flask_login import LoginManager
from .instance import app
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
login = LoginManager(app)
login.login_view = 'signin'
login.session_protection = "strong"
login.login_message_category = "info"

