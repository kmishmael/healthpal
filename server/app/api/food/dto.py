
from flask_restx import Model
from flask_restx.fields import String, Boolean, Integer
from flask_restx.reqparse import RequestParser


food_model = Model(
    "Food",
    {
        "name": String,
        "type": String,
        "quantity": Integer,
        "calories": Integer,
        "servings": Integer
    },
)

meal_model = Model(
    "Meal",
    {
        "name": String,
        "meal_owner": Integer
    }
)

meal_allocation_model = Model(
    "MealAllocation",
    {
        "food_id": Integer,
        "calories": Integer,
        "servings": Integer,
        "meal_id": Integer
    }
)

food_reqparser = RequestParser(bundle_errors=True)
food_reqparser.add_argument(name="name", type=str,
                            required=True, nullable=False)
food_reqparser.add_argument(name="type", type=str, nullable=True)
food_reqparser.add_argument(name="quantity", type=int)
food_reqparser.add_argument(name="calories", type=int)
food_reqparser.add_argument(name="servings", type=int)

meal_reqparser = RequestParser(bundle_errors=True)
meal_reqparser.add_argument(name="name", type=str)
meal_reqparser.add_argument(name="meal_owner", type=int)

meal_allocation_reqparser = RequestParser(bundle_errors=True)
meal_allocation_reqparser.add_argument(name="food_id", type=int)
meal_allocation_reqparser.add_argument(name="calories", type=int)
meal_allocation_reqparser.add_argument(name="servings", type=int)
meal_allocation_reqparser.add_argument(name="meal_id", type=int)

