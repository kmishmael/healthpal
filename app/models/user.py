#!/usr/bin/python3
"""the user model"""

from flask import current_app
from flask_login import UserMixin
import jwt
import enum
from werkzeug.security import generate_password_hash, check_password_hash
import bson
from sqlalchemy.ext.hybrid import hybrid_property
from app.util.datetime_util import (
    get_local_utcoffset,
    make_tzaware,
    localized_dt_string,
)
from app import db, bcrypt
from datetime import datetime, timezone


class UserRoles(enum.Enum):
    """User roles enum definition"""
    user = 'USER'
    admin = 'ADMIN'


class GenderOptions(enum.Enum):
    """gender options enum definition"""
    male = 'MALE'
    female = 'FEMALE'
    other = 'OTHER'


class IsVerified(enum.Enum):
    """is a user verified?"""
    true = 'TRUE'
    false = 'FALSE'


class User(UserMixin, db.Model):
    """user model"""
    __tablename__ = 'user'

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String(120), index=True, unique=True)
    profile_photo = db.Column(db.String())
    email_verified = db.Column(db.Enum(IsVerified), default=IsVerified.false)
    password_hash = db.Column(db.String(100), nullable=False)
    role = db.Column(db.Enum(UserRoles), default=UserRoles.user)
    age = db.Column(db.Integer())
    height = db.Column(db.Integer())
    weight = db.Column(db.Integer())
    gender = db.Column(db.Enum(GenderOptions))
    target_calories = db.Column(db.Integer())

    def __repr__(self):
        """specify how to print the class"""
        return f'<User {self.email} name {self.name}>'

    @hybrid_property
    def registered_on_str(self):
        registered_on_utc = make_tzaware(
            self.registered_on, use_tz=timezone.utc, localize=False
        )
        return localized_dt_string(registered_on_utc, use_tz=get_local_utcoffset())

    @property
    def password(self):
        raise AttributeError("password: write-only field")

    @password.setter
    def password(self, password):
        log_rounds = current_app.config.get("BCRYPT_LOG_ROUNDS")
        hash_bytes = bcrypt.generate_password_hash(password, log_rounds)
        self.password_hash = hash_bytes.decode("utf-8")

    def set_password(self, password):
        """Password hashing"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """verify password"""
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, current_app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)

    def get_by_id(self, user_id):
        """Get a user by id"""
        user = db.users.find_one(
            {"_id": bson.ObjectId(user_id), "active": True})
        if not user:
            return
        user["_id"] = str(user["_id"])
        user.pop("password")
        return user

    def get_by_email(self, email):
        """Get a user by email"""
        user = db.users.find_one({"email": email, "active": True})
        if not user:
            return
        user["_id"] = str(user["_id"])
        return user

    def login(self, email, password):
        """Login a user"""
        user = self.get_by_email(email)
        if not user or not check_password_hash(user["password"], password):
            return
        user.pop("password")
        return user

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'profile_photo': self.profile_photo,
            'email_verified': self.email_verified.value,
            'role': self.role.value,
            'age': self.age,
            'height': self.height,
            'weight': self.weight,
            'gender': self.gender,
            'target_calories': self.target_calories
        }

    @classmethod
    def find_by_email(self, email):
        return self.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(self, public_id):
        return self.query.filter_by(public_id=public_id).first()
