from flask_restx import Model
from flask_restx.fields import String, Boolean, Integer, Date
from flask_restx.reqparse import RequestParser


step_model = Model(
    "Step",
    {
        "steps": Integer,
    },
)

steps_reqparser = RequestParser(bundle_errors=True)

steps_reqparser.add_argument(name="steps", type=int, nullable=True)

