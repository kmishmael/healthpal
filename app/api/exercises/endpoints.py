"""API endpoint definitions for /exercise namespace."""
from http import HTTPStatus

from flask_restx import Namespace, Resource
from app import db

from app.api.exercises.dto import exercise_allocation, exercise_model, exercise_allocation_reqparser, exercises_model, exercise_reqparser
from app.models.exercise import Exercise
from app.models.exercise_allocation import ExerciseAllocation

exercise_ns = Namespace(name="exercise", validate=True)
exercises_ns = Namespace(name="exercises", validate=True)
exercise_create_ns = Namespace(name="exercises_create", validate=True)
exercise_allocation_ns = Namespace(name="exercise-allocation", validate=True)

exercise_ns.models[exercises_model.name] = exercises_model
exercises_ns.models[exercise_model.name] = exercise_model
exercise_create_ns.models[exercise_allocation.name] = exercise_allocation
exercise_allocation_ns.models[exercise_allocation.name] = exercise_allocation


@exercise_ns.route("/", endpoint="exercise_create")
class ExerciseResource(Resource):
    """Handle HTTP requests to URL: /api/v1/exercise"""

    @exercise_ns.expect(exercise_reqparser)
    @exercise_ns.doc(security="Bearer")
    @exercise_ns.response(int(HTTPStatus.CREATED), "New Exercise was successfully created.")
    @exercise_ns.response(int(HTTPStatus.CONFLICT), "Exercise creation conflict.")
    @exercise_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercise_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """create a new exercise."""
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


@exercise_ns.route("/<int:exercise_id>", endpoint="exercise_rud")
class ExerciseRUDResource(Resource):
    """Handles HTTP requests to: /api/v1/exercise/<exercise_id>"""

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


@exercises_ns.route("/", endpoint="exercises_create")
class ExercisesResource(Resource):
    """Handles HTTP requests to URL: /api/v1/exercises"""

    @exercises_ns.expect(exercise_reqparser)
    @exercises_ns.doc(security="Bearer")
    @exercises_ns.response(int(HTTPStatus.CREATED), "New user was successfully created.")
    @exercises_ns.response(int(HTTPStatus.CONFLICT), "Email address is already registered.")
    @exercises_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercises_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Register a new exercise."""
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
        exercises = db.exercises.find()
        return exercises


@exercise_create_ns.route("/allocation", endpoint="exercise_create_allocation")
class ExerciseCreateAllocationResource(Resource):
    """Handles HTTP requests to URL: /api/v1/exercise/register."""

    @exercise_create_ns.expect(exercise_allocation_reqparser)
    @exercise_create_ns.doc(security="Bearer")
    @exercise_create_ns.response(int(HTTPStatus.CREATED), "New user was successfully created.")
    @exercise_create_ns.response(int(HTTPStatus.CONFLICT), "Email address is already registered.")
    @exercise_create_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercise_create_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Register a new user and return an access token."""
        try:
            request_data = exercise_allocation_reqparser.parse_args()
            new_exercise_allocation = ExerciseAllocation(**request_data)
            db.session.add(new_exercise_allocation)
            db.session.commit()
            return dict(status="success",
                        message="Exercise Allocation done successfully.")
        except Exception as e:
            return dict(status="success",
                        message=str(e))


@exercise_allocation_ns.route("/allocation/<int:user_id>", endpoint="exercise_allocation")
class ExerciseAllocationResource(Resource):
    """Handles HTTP requests to URL: /api/v1/exercise/register."""

    @exercise_allocation_ns.response(int(HTTPStatus.OK), "Exercise retrieved successfully.")
    @exercise_allocation_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def get(self, exercise_id):
        """Retrieve exercise by ID."""
        try:
            exercise = ExerciseAllocation.query.get(exercise_id)

            if exercise:
                return dict(status="success", message="Exercise retrieved successfully.", data=exercise.serialize())
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @exercise_allocation_ns.response(int(HTTPStatus.OK), "Exercise updated successfully.")
    @exercise_allocation_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def put(self, exercise_id):
        """Update exercise by ID."""

        args = exercise_reqparser.parse_args()

        try:
            exercise = ExerciseAllocation.query.get(exercise_id)

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

    @exercise_allocation_ns.response(int(HTTPStatus.OK), "Exercise deleted successfully.")
    @exercise_allocation_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def delete(self, exercise_id):
        """Delete exercise by ID."""
        try:
            exercise = ExerciseAllocation.query.get(exercise_id)

            if exercise:
                db.session.delete(exercise)
                db.session.commit()
                return dict(status="success", message="Exercise deleted successfully.")
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR