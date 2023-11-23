"""Meal model implementation"""

from app import db


class Meals(db.Model):
    """meal model definition"""
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Text())
    meal_owner = db.Column(db.Text(), db.PrimaryKey('profile.id'))
