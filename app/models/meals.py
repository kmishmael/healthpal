"""Meal model implementation"""

from app import db


class Meal(db.Model):
    """meal model definition"""
    __tablename__ = 'meal'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Text())
    meal_owner = db.Column(db.Integer(), db.ForeignKey('user.id'))
    owner = db.relationship('User', backref=db.backref('mealowners'))
