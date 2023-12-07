"""Exercises model"""

from app import db
from datetime import date
import enum

class ExerciseType(enum.Enum):
    CARDIO = 'CARDIO'
    STRENGTH = 'STRENGTH'
    FLEXIBILITY = 'FLEXIBILITY'

"""a group of exercises belonging to a user"""
class Exercises(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    exercise_id = db.Column(db.Integer(), db.ForeignKey('exercise.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    name = db.Column(db.Text())
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    date = db.Column(db.Date, nullable=False, default=date.today())
    sets = db.Column(db.Integer(), default=1)
    reps = db.Column(db.Integer(), default=3)
    time =  db.Column(db.Integer())
    exercise = db.relationship('Exercise', backref=db.backref('exercises'))
    user = db.relationship('User', backref=db.backref('exercises_owner'))
    type = db.Column(db.Enum(ExerciseType), nullable=False)