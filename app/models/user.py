#!/usr/bin/python3
"""the user model"""

from flask import current_app
from flask_login import UserMixin
import jwt
import enum
import bson
from sqlalchemy.ext.hybrid import hybrid_property
from app.util.datetime_util import (
    get_local_utcoffset,
    make_tzaware,
    localized_dt_string,
)
from app import db, bcrypt
from datetime import datetime, timedelta, timezone
from app.util.result import Result
from app.models.token_blacklist import BlacklistedToken

class UserRoles(enum.Enum):
    """User roles enum definition"""
    USER = 'USER'
    ADMIN = 'ADMIN'


class GenderOptions(enum.Enum):
    """gender options enum definition"""
    MALE = 'MALE'
    FEMALE = 'FEMALE'
    OTHER = 'OTHER'


class IsVerified(enum.Enum):
    """is a user verified?"""
    TRUE = 'TRUE'
    FALSE = 'FALSE'


class User(UserMixin, db.Model):
    """user model"""
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), index=True, unique=True, nullable=False)
    profile_photo = db.Column(db.String())
    email_verified = db.Column(db.Boolean, default=False)
    password_hash = db.Column(db.String(100), nullable=False)
    role = db.Column(db.Enum(UserRoles), default='USER')
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

    def check_password(self, password):
        """verify password"""
        return bcrypt.check_password_hash(self.password_hash, password)

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

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'profile_photo': self.profile_photo,
            'email_verified': self.email_verified,
            'role': self.role,
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
    def find_by_id(self, id):
        return self.query.filter_by(id=id).first()

    def encode_access_token(self):
        now = datetime.now(timezone.utc)
        token_age_h = current_app.config.get("TOKEN_EXPIRE_HOURS")
        token_age_m = current_app.config.get("TOKEN_EXPIRE_MINUTES")
        expire = now + timedelta(hours=token_age_h, minutes=token_age_m)
        if current_app.config["TESTING"]:
            expire = now + timedelta(seconds=5)
        payload = dict(exp=expire, iat=now, sub=self.id, role=self.role.value)
        key = current_app.config.get("SECRET_KEY")
        return jwt.encode(payload, key, algorithm="HS256")

    @staticmethod
    def decode_access_token(access_token):
        if isinstance(access_token, bytes):
            access_token = access_token.decode("ascii")
        if access_token.startswith("Bearer "):
            split = access_token.split("Bearer")
            access_token = split[1].strip()
        try:
            key = current_app.config.get("SECRET_KEY")
            payload = jwt.decode(access_token, key, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            error = "Access token expired. Please log in again."
            return Result.Fail(error)
        except jwt.InvalidTokenError:
            error = "Invalid token. Please log in again."
            return Result.Fail(error)
        if BlacklistedToken.check_blacklist(access_token):
            error = "Token blacklisted. Please log in again."
            return Result.Fail(error)
        token_payload = dict(
            id=payload["sub"],
            role=payload["role"],
            token=access_token,
            expires_at=payload["exp"],
        )
        return Result.Ok(token_payload)
