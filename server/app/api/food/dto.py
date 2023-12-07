
from flask_restx import Model
from flask_restx.fields import String, Boolean, Integer
from flask_restx.reqparse import RequestParser
import enum


class FoodType(enum.Enum):
    """is a user verified?"""
    PUBLIC = 'PUBLIC'
    CUSTOM = 'CUSTOM'


food_model = Model(
    "Food",
    {
        "name": String,
        "type": String(enum=[FoodType.PUBLIC, FoodType.CUSTOM]),
        "user_id": Integer,
        "calories": Integer,

    },
)

food_parser = RequestParser()
food_parser.add_argument(
    "name", type=str, required=True, help="Name of the food")
food_parser.add_argument("type", type=str, choices=FoodType._member_names_,
                         default=FoodType.PUBLIC.value, help="Type of the food")
food_parser.add_argument("user_id", type=int, required=False,
                         help="User ID associated with the food")
food_parser.add_argument("calories", type=int,
                         required=False, help="Calories in the food")
food_parser.add_argument("total_carbohydrates", type=float, required=False,
                         help="Total carbohydrates in the food")
food_parser.add_argument("total_fat", type=float, required=False, help="Total fat in the food")
food_parser.add_argument("protein", type=float, required=False, help="Protein in the food")
food_parser.add_argument("saturated_fat", required=False, type=float,
                         help="Saturated fat in the food")
food_parser.add_argument("trans_fat", type=float, required=False, help="Trans fat in the food")
food_parser.add_argument("cholesterol", type=float,
                         help="Cholesterol in the food")
food_parser.add_argument("sodium", type=float, required=False, help="Sodium in the food")
food_parser.add_argument("potassium", type=float, required=False, help="Potassium in the food")
food_parser.add_argument("dietary_fibre", required=False, type=float,
                         help="Dietary fiber in the food")
food_parser.add_argument("sugars", type=float, required=False, help="Sugars in the food")
food_parser.add_argument("vitamin_a", type=float, required=False, help="Vitamin A in the food")
food_parser.add_argument("vitamin_c", type=float, required=False, help="Vitamin C in the food")
food_parser.add_argument("calcium", type=float, required=False, help="Calcium in the food")
food_parser.add_argument("iron", type=float, required=False, help="Iron in the food")
