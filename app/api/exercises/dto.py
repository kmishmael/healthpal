"""parsers and serializers for /auth API endpoints"""
from flask_restx import Model
from flask_restx.fields import String, Boolean, Integer
from flask_restx.reqparse import RequestParser


exercise_model = Model(
    "Exercise",
    {
        "id": Integer,
        "name": String,
        "calories": Integer,
        "sets": Integer,
        "reps": Integer
    },
)

exercises_model = Model("Exercises", {
    "id": Integer,
    "exercise_id": Integer,
    "name": String,
    "user_id": Integer,
})

exercise_allocation = Model("Exercise Allocation", {
    "id": Integer,
    "exercises_id": Integer,
    "reps": Integer,
    "sets": Integer,
    "exercise_id": Integer
})


exercise_reqparser = RequestParser(bundle_errors=True)
exercise_reqparser.add_argument(name="name", type=str, location="form", required=True, nullable=False)
exercise_reqparser.add_argument(name="type", type=str)
exercise_reqparser.add_argument(name="sets", type=int)
exercise_reqparser.add_argument(name="reps", type=int)
exercise_reqparser.add_argument(name="calories", type=int, location="form", required=True, nullable=False)
exercise_reqparser.add_argument(name="time", type=int)
