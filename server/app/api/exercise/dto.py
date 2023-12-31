
from flask_restx import Model
from flask_restx.fields import String, Boolean, Integer
from flask_restx.reqparse import RequestParser
import enum


exercise_model = Model(
    "Food",
    {
        "name": String,
        "calories": Integer,
    }
)

exercise_parser = RequestParser()
exercise_parser.add_argument(
    "name", type=str, required=True)
exercise_parser.add_argument(
    "user_id", type=str, required=True)
exercise_parser.add_argument(
    "sets", type=str, nullable=True, required=False)
exercise_parser.add_argument(
    "reps", type=str, nullable=True, required=False)
exercise_parser.add_argument(
    "calories", type=str, required=True)
exercise_parser.add_argument(
    "time", type=str, required=True)

