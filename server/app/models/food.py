"""food model"""

from app import db
import enum
from .user import User


class FoodType(enum.Enum):
    """is a user verified?"""
    PUBLIC = 'PUBLIC'
    CUSTOM = 'CUSTOM'


class Food(db.Model):
    """Food model definition"""
    __tablename__ = 'food'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text())
    # PUBLIC or CUSTOM
    type = db.Column(db.Enum(FoodType), default=FoodType.PUBLIC.value)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    calories = db.Column(db.Integer)
    total_carbohydrates = db.Column(db.Float, nullable=True)
    total_fat = db.Column(db.Float, nullable=True)
    protein = db.Column(db.Float, nullable=True)
    saturated_fat = db.Column(db.Float, nullable=True)
    trans_fat = db.Column(db.Float, nullable=True)
    cholesterol = db.Column(db.Float, nullable=True)
    sodium = db.Column(db.Float, nullable=True)
    potassium = db.Column(db.Float, nullable=True)
    dietary_fibre = db.Column(db.Float, nullable=True)
    sugars = db.Column(db.Float, nullable=True)
    vitamin_a = db.Column(db.Float, nullable=True)
    vitamin_c = db.Column(db.Float, nullable=True)
    calcium = db.Column(db.Float, nullable=True)
    iron = db.Column(db.Float, nullable=True)

    meals = db.relationship('Meal', backref='food', lazy=True, cascade='all')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type': self.type.value,
            'user_id': self.user_id,
            'calories': self.calories,
            'total_carbohydrates': self.total_carbohydrates,
            'total_fat': self.total_fat,
            'protein': self.protein,
            'saturated_fat': self.saturated_fat,
            'trans_fat': self.trans_fat,
            'cholesterol': self.cholesterol,
            'sodium': self.sodium,
            'potassium': self.potassium,
            'dietary_fibre': self.dietary_fibre,
            'sugars': self.sugars,
            'vitamin_a': self.vitamin_a,
            'vitamin_c': self.vitamin_c,
            'calcium': self.calcium,
            'iron': self.iron
        }
