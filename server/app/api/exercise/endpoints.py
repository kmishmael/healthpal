from http import HTTPStatus
from flask import jsonify
from flask_restx import Namespace, Resource
from app import db
from app.api.exercise.dto import exercise_model, exercise_parser  # Make sure to import the appropriate DTOs
from app.models.exercise import Exercise
from sqlalchemy.orm.exc import NoResultFound

exercise_ns = Namespace(name="exercise", validate=True)
exercise_create_ns = Namespace(name="exercise_create", validate=True)

exercise_ns.models[exercise_model.name] = exercise_model

@exercise_create_ns.route("/", endpoint="exercise_c")
class ExerciseCreateResource(Resource):
    """Handles HTTP requests to: /api/v1/exercise"""

    @exercise_create_ns.expect(exercise_parser)
    @exercise_create_ns.doc(security="Bearer")
    @exercise_create_ns.response(int(HTTPStatus.CREATED), "Exercise created successfully.")
    @exercise_create_ns.response(int(HTTPStatus.CONFLICT), "Duplicate exercise id")
    @exercise_create_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercise_create_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Create a new Exercise."""
        try:
            request_data = exercise_parser.parse_args()
            new_exercise = Exercise(**request_data)
            db.session.add(new_exercise)
            db.session.commit()
            return dict(status="success", message=f"Exercise with id {new_exercise.id} created.")
        except Exception as e:
            import traceback
            traceback.print_exc()
            return dict(status="error", message=str(e))


@exercise_ns.route("/<int:exercise_id>", endpoint="exercise_crud")
class ExerciseResponse(Resource):
    """Handles HTTP requests to: /api/v1/exercise/<exercise_id>"""

    @exercise_ns.response(int(HTTPStatus.OK), "Exercise retrieved successfully.")
    @exercise_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def get(self, exercise_id):
        """Retrieve Exercise by ID."""
        try:
            exercise = Exercise.query.get(exercise_id)
            if exercise:
                return dict(status="success", message="Exercise retrieved successfully.", data=exercise.to_dict())
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @exercise_ns.response(int(HTTPStatus.OK), "Exercise updated successfully.")
    @exercise_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def put(self, exercise_id):
        """Update Exercise by ID."""
        try:
            exercise = Exercise.query.get(exercise_id)
            if exercise:
                request_data = exercise_parser.parse_args()
                for key, value in request_data.items():
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
        """Delete Exercise by ID."""
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
