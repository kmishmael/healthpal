"""Meal model implementation"""

from app import db
import enum
from datetime import date
from datetime import timedelta


class MealType(enum.Enum):
    """Meal type enum"""
    BREAKFAST = 'BREAKFAST'
    LUNCH = 'LUNCH'
    DINNER = 'DINNER'
    MORNING_SNACK = 'MORNING_SNACK'
    AFTERNOON_SNACK = 'AFTERNOON_SNACK'
    EVENING_SNACK = 'EVENING_SNACK'


class ServingType(enum.Enum):
    """Meal type enum"""
    SERVING = 'SERVING'
    CALORIES = 'CALORIES'


class Meal(db.Model):
    """meal model definition"""
    __tablename__ = 'meal'
    id = db.Column(db.Integer(), primary_key=True, autoincrement=True)
    food_id = db.Column(db.Integer(), db.ForeignKey('food.id'), nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.Enum(MealType), nullable=False)
    date = db.Column(db.Date, nullable=False, default=date.today())
    serving_type = db.Column(
        db.Enum(ServingType), nullable=False,  default=ServingType.SERVING.value)
    amount = db.Column(db.Float(), nullabe=False)
    food = db.relationship('Food', backref=db.backref('meals'))
    user = db.relationship('User', backref=db.backref('meals_owner'))

    def to_dict(self):
        return {
            'id': self.id,
            'food_id': self.food_id,
            'user_id': self.user_id,
            'type': self.type.value,
            'date': str(self.date),
            'serving_type': self.serving_type.value,
            'amount': self.amount,
        }

    @classmethod
    def get_days_menu(cls, user_id, specific_date=None):
        """Get the day's menu grouped by meal types"""
        if specific_date is None:
            specific_date = date.today()
        meals = cls.query.filter_by(user_id=user_id, date=specific_date).all()
        return cls.group_menu_by_type(meals)

    @classmethod
    def get_months_menu(cls, user_id, specific_month=None):
        """Get the current month's menu grouped by meal types"""
        if specific_month is None:
            specific_month = date.today()
        start_date = date(specific_month.year, specific_month.month, 1)
        end_date = date(specific_month.year,
                        specific_month.month + 1, 1) - timedelta(days=1)

        meals = cls.query.filter_by(user_id=user_id).filter(
            cls.date.between(start_date, end_date)).all()
        return cls.group_menu_by_type(meals)

    @classmethod
    def group_menu_by_type(cls, meals):
        """Group meals by meal type"""
        menu_by_type = {meal_type: [] for meal_type in MealType}

        for meal in meals:
            menu_by_type[meal.type].append({
                'id': meal.id,
                'food_id': meal.food_id,
                'amount': meal.amount,
                'serving_type': meal.serving_type.value,
                'food_name': meal.food.name,  # assuming there's a 'name' attribute in the Food model
            })

        return menu_by_type
