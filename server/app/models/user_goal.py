"""User goal model"""

import enum
from app import db


class GoalType(enum.Enum):
    """goal type enum definition"""
    add = 'ADD'
    lose = 'LOSE'
    maintain = 'MAINTAIN'


class UserGoal(db.Model):
    """user goal model"""
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),
        nullable=False)
    type = db.Column(db.Enum(GoalType))
    target_cal = db.Column(db.Integer())
    target_weight = db.Column(db.Integer())
    duration = db.Column(db.Integer())

