"""Exercises model"""

from app import db

"""a group of exercises belonging to a user"""
class Exercises(db.Model):
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    exercise_id = db.Column(db.Integer(), db.ForeignKey('exercise.id'))
    name = db.Column(db.Text())
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    exercise = db.relationship('Exercise', backref=db.backref('exercises'))
    owner = db.relationship('User', backref=db.backref('exercises_owner'))
