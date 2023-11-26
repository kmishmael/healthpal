"""Exercise model"""

from app import db

class Exercise(db.Model):
    """exercises model"""
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True, nullable=False)
    name = db.Column(db.Text(), nullable=False)
    type = db.Column(db.Text())
    sets = db.Column(db.Integer(), default=1)
    reps = db.Column(db.Integer(), default=3)
    calories = db.Column(db.Integer(), nullable=False)
    time =  db.Column(db.Integer())
