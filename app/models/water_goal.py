"""water goal model"""

from app import db

class WaterGoal(db.Model):
    """Water goal model"""
    id = db.Column(db.Integer(), primary_key=True)
    profile_id = db.Column(db.Integer(), db.ForeignKey('profile.id'))
    goal_cups = db.Column(db.Integer())
    current_cups = db.Column(db.Integer())
