"""Steps model implementation"""

from app import db
from datetime import date


class StepData(db.Model):
    """steps model definition"""
    __tablename__ = 'step_data'

    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today())
    steps = db.Column(db.Integer(), nullable=False)
    distance = db.Column(db.Integer(), nullable=True)
    move_duration = db.Column(db.Integer(), nullable=True)
    calories_burned = db.Column(db.Integer(), nullable=True)
    owner = db.relationship('User', backref=db.backref('steps_owner'))
