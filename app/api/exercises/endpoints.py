"""API endpoint definitions for /exercise namespace."""
from http import HTTPStatus

from flask_restx import Namespace, Resource
from app import db

from app.api.exercises.dto import exercise_allocation, exercise_model, exercises_model, exercise_reqparser
from app.models.exercise import Exercise


exercise_ns = Namespace(name="exercise", validate=True)
exercises_ns = Namespace(name="exercises", validate=True)
exercise_allocation_ns = Namespace(name="exercise-allocation", validate=True)

exercise_ns.models[exercises_model.name] = exercises_model
exercises_ns.models[exercise_model.name] = exercise_model
exercise_allocation_ns.models[exercise_allocation.name] = exercise_allocation


@exercises_ns.route("/", endpoint="exercises_create")
class Exercises(Resource):
    """Handles HTTP requests to URL: /api/v1/exercise/register."""

    @exercises_ns.expect(exercise_reqparser)
    @exercises_ns.doc(security="Bearer")
    @exercises_ns.response(int(HTTPStatus.CREATED), "New user was successfully created.")
    @exercises_ns.response(int(HTTPStatus.CONFLICT), "Email address is already registered.")
    @exercises_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercises_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Register a new user and return an access token."""
        try:
            request_data = exercise_reqparser.parse_args()
            new_user = Exercise(**request_data)
            db.session.add(new_user)
            db.session.commit()
            return dict(status="success",
                        message="Exercise created successfully.")
        except Exception as e:
            return dict(status="success",
                        message=str(e))

    @exercises_ns.doc(security="Bearer")
    @exercises_ns.response(int(HTTPStatus.OK), "Token is currently valid.", exercises_model)
    @exercises_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercises_ns.response(int(HTTPStatus.UNAUTHORIZED), "Token is invalid or expired.")
    @exercises_ns.marshal_with(exercise_model, as_list=True)
    def get(self):
        """Validate access token and return user info."""
        exercises  = db.exercises.find()
        return exercises


@exercise_ns.route("/<int:exercise_id>", endpoint="exercise_create")
class Exercise(Resource):
    """Handles HTTP requests to: /api/v1/exercises/<exercise_id>"""

    @exercise_ns.response(int(HTTPStatus.OK), "Exercise retrieved successfully.")
    @exercise_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def get(self, exercise_id):
        """Retrieve exercise by ID."""
        try:
            exercise = Exercise.query.get(exercise_id)

            if exercise:
                return dict(status="success", message="Exercise retrieved successfully.", data=exercise.serialize())
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


    @exercise_ns.response(int(HTTPStatus.OK), "Exercise updated successfully.")
    @exercise_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def put(self, exercise_id):
        """Update exercise by ID."""

        args = exercise_reqparser.parse_args()

        try:
            exercise = Exercise.query.get(exercise_id)

            if exercise:
                for key, value in args.items():
                    if value is not None:
                        setattr(exercise, key, value)

                db.session.commit()
                return dict(status="success", message="Exercise updated successfully.")
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


    @exercise_ns.response(int(HTTPStatus.OK), "Exercise deleted successfully.")
    @exercise_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def delete(self, exercise_id):
        """Delete exercise by ID."""
        try:
            exercise = Exercise.query.get(exercise_id)

            if exercise:
                db.session.delete(exercise)
                db.session.commit()
                return dict(status="success", message="Exercise deleted successfully.")
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
