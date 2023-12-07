from flask_restx import Model
from flask_restx.fields import String, Integer, Float
from flask_restx.reqparse import RequestParser
import enum

class MealType(enum.Enum):
    BREAKFAST = 'BREAKFAST'
    LUNCH = 'LUNCH'
    DINNER = 'DINNER'
    MORNING_SNACK = 'MORNING_SNACK'
    AFTERNOON_SNACK = 'AFTERNOON_SNACK'
    EVENING_SNACK = 'EVENING_SNACK'

class ServingType(enum.Enum):
    SERVING = 'SERVING'
    CALORIES = 'CALORIES'

meal_model = Model(
    "Meal",
    {
        "food_id": Integer,
        "user_id": Integer,
        "type": String(enum=[meal.value for meal in MealType]),
        "serving_type": String(enum=[serving.value for serving in ServingType]),
        "amount": Float,
    },
)


meal_parser = RequestParser()
meal_parser.add_argument("food_id", type=int, required=True, help="ID of the food associated with the meal")
meal_parser.add_argument("user_id", type=int, required=True, help="ID of the user associated with the meal")
meal_parser.add_argument("type", type=str, choices=[meal.value for meal in MealType], required=True, help="Type of the meal")
meal_parser.add_argument("serving_type", type=str, choices=[serving.value for serving in ServingType],
                         default=ServingType.SERVING.value, help="Type of serving")
meal_parser.add_argument("amount", type=float, required=True, help="Amount of the food in the meal")
