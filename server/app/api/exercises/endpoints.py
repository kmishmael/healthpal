from http import HTTPStatus
from flask import jsonify, request
from flask_restx import Namespace, Resource
from app import db
from app.api.exercises.dto import exercises_parser, exercises_model
from app.models.exercises import Exercises
from app.models.user import User
from datetime import date
from datetime import datetime

exercises_ns = Namespace(name="exercises", validate=True)

exercises_ns.models[exercises_model.name] = exercises_model

@exercises_ns.route("/<int:user_id>", endpoint="exercises_crud")
class ExercisesResponse(Resource):
    """Handles HTTP requests to: /api/v1/exercises/<user_id>"""

    @exercises_ns.expect(exercises_parser)
    @exercises_ns.doc(security="Bearer")
    @exercises_ns.response(int(HTTPStatus.CREATED), "Exercise created successfully.")
    @exercises_ns.response(int(HTTPStatus.CONFLICT), "Duplicate exercise id")
    @exercises_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercises_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self, user_id):
        """Create a new Exercise."""
        try:
            request_data = exercises_parser.parse_args()
            print(request_data)
            new_exercise = Exercises(**request_data)
            db.session.add(new_exercise)
            db.session.commit()
            return dict(status="success",
                        message=f"Exercises for user: {user_id} created. Got exercise id {new_exercise.id}. Data: {new_exercise.to_dict()}")
        except Exception as e:
            import traceback
            traceback.print_exc()
            return dict(status="error",
                        message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @exercises_ns.response(int(HTTPStatus.OK), "Exercises retrieved successfully.")
    @exercises_ns.response(int(HTTPStatus.NOT_FOUND), "Exercises not found.")
    def get(self, user_id):
        """Retrieve Exercises by User ID."""
        try:
            specific_date = request.args.get('specific_date')
            if specific_date:
                specific_date = datetime.strptime(
                    specific_date, '%Y-%m-%d').date()

            exercises = Exercises.query.filter_by(
                user_id=user_id, date=specific_date).all()

            if exercises:
                data = [exercise.to_dict() for exercise in exercises]
                return dict(status="success", message="Exercises retrieved successfully.", data=data)
            else:
                return dict(status="error", message="Exercises not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @exercises_ns.response(int(HTTPStatus.OK), "Exercises deleted successfully.")
    @exercises_ns.response(int(HTTPStatus.NOT_FOUND), "Exercises not found.")
    def delete(self, user_id):
        """Delete Exercises by User ID."""
        try:
            specific_date = request.args.get('specific_date')
            if specific_date:
                specific_date = datetime.strptime(
                    specific_date, '%Y-%m-%d').date()

            exercises = Exercises.query.filter_by(
                user_id=user_id, date=specific_date).all()

            if exercises:
                for exercise in exercises:
                    db.session.delete(exercise)
                db.session.commit()
                return dict(status="success", message="Exercises deleted successfully.")
            else:
                return dict(status="error", message="Exercises not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


@exercises_ns.route("/<int:user_id>/<int:exercise_id>", endpoint="exercise_item_crud")
class ExerciseItemResponse(Resource):
    """Handles HTTP requests to: /api/v1/exercises/<user_id>/<exercise_id>"""

    @exercises_ns.expect(exercises_parser)
    @exercises_ns.doc(security="Bearer")
    @exercises_ns.response(int(HTTPStatus.CREATED), "Exercise created successfully.")
    @exercises_ns.response(int(HTTPStatus.CONFLICT), "Duplicate exercise id")
    @exercises_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @exercises_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def put(self, user_id, exercise_id):
        """Update an Exercise."""
        try:
            exercise = Exercises.query.get(exercise_id)
            if exercise:
                request_data = exercises_parser.parse_args()
                for key, value in request_data.items():
                    setattr(exercise, key, value)
                db.session.commit()
                return dict(status="success",
                            message=f"Exercises for user: {user_id} updated. Updated exercise id {exercise.id}")
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error",
                        message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @exercises_ns.response(int(HTTPStatus.OK), "Exercise retrieved successfully.")
    @exercises_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def get(self, user_id, exercise_id):
        """Retrieve an Exercise by User ID and Exercise ID."""
        try:
            exercise = Exercises.query.get(exercise_id)

            if exercise:
                data = exercise.to_dict()
                return dict(status="success", message="Exercise retrieved successfully.", data=data)
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            import traceback
            traceback.print_exc()
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @exercises_ns.response(int(HTTPStatus.OK), "Exercise deleted successfully.")
    @exercises_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def delete(self, user_id, exercise_id):
        """Delete an Exercise by User ID and Exercise ID."""
        try:
            exercise = Exercises.query.get(exercise_id)
            if exercise:
                db.session.delete(exercise)
                db.session.commit()
                return dict(status="success", message="Exercise deleted successfully.")
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
