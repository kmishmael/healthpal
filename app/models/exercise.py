"""Exercise model"""

from app import db

class Exercise(db.Model):
    """exercises model"""
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Text())
    type = db.Column(db.Text())
    sets = db.Column(db.Integer())
    reps = db.Column(db.Integer())
    calories = db.Column(db.Integer())
    time =  db.Column(db.Integer())
