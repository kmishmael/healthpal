#!/usr/bin/python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('MYSQL_URL') or  'sqlite:///' + os.path.join(basedir, 'app.db')

app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.webp', '.jpeg']
app.config['UPLOAD_PATH'] = 'app/static/images'

# Flask SQLAlchemy
db = SQLAlchemy(app)

# Flask Migrate
migrate = Migrate(app, db)

# Flask Login
login = LoginManager(app)
login.login_view = 'signin'

from app import routes, models
