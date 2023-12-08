from flask_restx import Model
from flask_restx.fields import String, Integer, datetime
from flask_restx.reqparse import RequestParser
from app import db
from datetime import date
import enum

class ExerciseType(enum.Enum):
    CARDIO = 'CARDIO'
    STRENGTH = 'STRENGTH'
    FLEXIBILITY = 'FLEXIBILITY'

exercises_model = Model(
    "Exercises",
    {
        "exercise_id": Integer,
        "user_id": Integer,
        "type": String(enum=[exercise.value for exercise in ExerciseType]),
    },
)

exercises_parser = RequestParser()
exercises_parser.add_argument("exercise_id", type=int, required=True, help="ID of the exercise")
exercises_parser.add_argument("user_id", type=int, required=True, help="ID of the user")
exercises_parser.add_argument("sets", type=int, default=1, help="Number of sets")
exercises_parser.add_argument("reps", type=int, default=3, help="Number of repetitions")
exercises_parser.add_argument("time", type=int, help="Time spent on the exercise")
exercises_parser.add_argument("type", type=str, choices=[exercise.value for exercise in ExerciseType], required=True, help="Type of the exercise")
