"""Exercises model"""

import models
from app import db

class Exercises(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    exercise_id = db.Column(db.Integer(), db.ForeignKey('exercise.id'))
    name = db.Column(db.Text())
    profile_id = db.Column(db.Integer(), db.ForeignKey('profile.id'))
