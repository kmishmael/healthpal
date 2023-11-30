"""food model"""

from app import db


class Food(db.Model):
    """Food model definition"""
    __tablename__ = 'food'

    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.Text())
    type = db.Column(db.Text())
    quantity = db.Column(db.Integer())
    calories = db.Column(db.Integer())
    servings = db.Column(db.Integer())

