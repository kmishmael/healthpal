#!/usr/bin/python3
"""the user model"""

import models
from models.base_model import BaseModel, Base
from os import getenv
import sqlalchemy
from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from hashlib import md5
from flask_login import UserMixin
from time import time
import jwt

class User(UserMixin, db.Model)