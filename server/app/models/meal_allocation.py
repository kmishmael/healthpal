"""Meal allocation model"""

from app import db


class MealAllocation(db.Model):
    """meal allocation model"""
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    food_id = db.Column(db.Integer(), db.ForeignKey('food.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    calories = db.Column(db.Integer())
    servings = db.Column(db.Integer())
    meal_id = db.Column(db.Integer(), db.ForeignKey('meal.id'))
    foods = db.relationship('Food', backref=db.backref('foodallocation'))
    meals = db.relationship('Meal', backref=db.backref('mealsallocation'))
