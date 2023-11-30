from flask_restx import Model
from flask_restx.fields import String, Boolean, Integer
from flask_restx.reqparse import RequestParser


water_goal_model = Model(
    "WaterGoal",
    {
        "name": String,
        "type": String,
        "quantity": Integer,
        "calories": Integer,
        "servings": Integer
    },
)

water_goal_reqparser = RequestParser(bundle_errors=True)
water_goal_reqparser.add_argument(name="name", type=str,
                            required=True, nullable=False)
water_goal_reqparser.add_argument(name="type", type=str, nullable=True)

