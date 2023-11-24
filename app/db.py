#!/usr/bin/python3

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import logging
from logging.handlers import SMTPHandler, RotatingFileHandler
import os
from flask_restful import Api
from .instance import app


# Flask SQLAlchemy
db = SQLAlchemy(app)

# Flask Migrate
migrate = Migrate(app, db)

