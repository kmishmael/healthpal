from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os
from flask_restful import Api
from .instance import app
from flask_login import LoginManager
from flask_bcrypt import Bcrypt


basedir = os.path.abspath(os.path.dirname(__file__))


bcrypt = Bcrypt()
login = LoginManager()
login.login_view = 'signin'
login.session_protection = "strong"
login.login_message_category = "info"

# Flask SQLAlchemy
db = SQLAlchemy()

# Flask Migrate
migrate = Migrate()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL_URL') or  'sqlite:///' + os.path.join(basedir, 'app.db')
    app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.webp', '.jpeg']
    app.config['UPLOAD_PATH'] = 'app/static/images'

    login.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)

    #return app
