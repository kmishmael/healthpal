#!/usr/bin/python3
"""the user model"""

from flask_login import UserMixin
import jwt
from app import login, app, db
import enum
from werkzeug.security import generate_password_hash, check_password_hash


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
    true = True
    false = False


class User(UserMixin, db.Model):
    """user model"""
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String(120), index=True, unique=True)
    profile_photo = db.Column(db.String())
    email_verified = db.Column(db.Enum(UserRoles), default=IsVerified.false)
    role = db.Column(db.Enum(UserRoles), default=UserRoles.user)
    age = db.Column(db.Integer())
    height = db.Column(db.Integer())
    weight = db.Column(db.Integer())
    gender = db.Column(db.Enum(GenderOptions))
    target_calories = db.Column(db.Integer())

    def __repr__(self):
        """specify how to print the class"""
        return f'<User {self.email} name {self.name}>'

    def set_password(self, password):
        """Password hashing"""
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        """verify password"""
        return check_password_hash(self.password_hash, password)

    @staticmethod
    def verify_reset_password_token(token):
        try:
            id = jwt.decode(token, app.config['SECRET_KEY'],
                            algorithms=['HS256'])['reset_password']
        except:
            return
        return User.query.get(id)


@login.user_loader
def load_user(id):
    """Flask login user load function"""
    return User.query.get(int(id))
