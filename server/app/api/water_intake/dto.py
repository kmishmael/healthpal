from flask_restx import Model
from flask_restx.fields import String, Boolean, Integer
from flask_restx.reqparse import RequestParser

water_intake_model = Model(
    "WaterIntakes",
    {
        "amount": Integer,
    },
)

# Flask-RESTx request parser for WaterGoal
water_intake_reqparser = RequestParser(bundle_errors=True)
water_intake_reqparser.add_argument(name="amount", type=int)