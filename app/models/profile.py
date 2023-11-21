"""Profile model"""

import models
from app import db, app
import enum

class GenderOptions(enum.Enum):
    """gender options enum definition"""
    male = 'MALE'
    female = 'FEMALE'
    other = 'OTHER'

class Profile(db.Model):
    """profile model"""
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    age = db.Column(db.Integer())
    height = db.Column(db.Integer())
    weight = db.Column(db.Integer())
    gender = db.Column(db.Enum(GenderOptions))
    target_calories = db.Column(db.Integer())
