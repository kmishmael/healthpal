#!/usr/bin/python3

import crypt
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os
from flask_restful import Api

from app.config import get_config
from .api.users import UsersResource
from flask_cors import CORS

from .instance import app

cors = CORS()
db = SQLAlchemy()
migrate = Migrate()
bcrypt = crypt()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(get_config(config_name))

    from .api import api_blueprint

    app.register_blueprint(api_blueprint)

    cors.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    return app
