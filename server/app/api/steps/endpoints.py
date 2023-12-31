"""API Endpoints definitions for /steps namespace"""
from http import HTTPStatus
from flask import jsonify

from flask_restx import Namespace, Resource
from app import db
from sqlalchemy.exc import IntegrityError

from app.api.steps.dto import steps_reqparser, step_model
from app.models.steps import StepData
from app.models.user import User
from datetime import date
from sqlalchemy.orm.exc import NoResultFound

step_ns = Namespace(name="steps", validate=True)

step_ns.models[step_model.name] = step_model


def resolve_weight(user):
    if not user.weight:
        if user.gender == 'MALE':
            return 89.4
        elif user.gender == 'FEMALE':
            return 77.4
        else:
            return 83.4
    return user.weight


@step_ns.route("/<int:user_id>", endpoint="steps_crud")
class StepsResponse(Resource):
    """Handles HTTP requests to: /api/v1/steps/<user_id>"""

    @step_ns.expect(steps_reqparser)
    @step_ns.doc(security="Bearer")
    @step_ns.response(int(HTTPStatus.CREATED), "Steps updated successfully.")
    @step_ns.response(int(HTTPStatus.CONFLICT), "Duplicate step id")
    @step_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @step_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self, user_id):
        """Create a new Food."""
        try:
            request_data = steps_reqparser.parse_args()
            # new_step = StepData(**request_data)
            steps = request_data.get("steps")
            # Estimating that 1 step = 0.67m, thus distance is in m
            distance = steps * 0.67
            # Assuming speed of 93m/min
            duration = distance / 93.33333
            user = User.query.get(user_id)
            weight = resolve_weight(user)
            # Formula: ((MET * Weight in kg) / 200) * duration
            # where MET => Metabolic equivalent of task
            calories_burned = ((2.5 * weight) / 200) * duration
            current_date = date.today()
            try:
                entry = db.session.query(StepData).filter_by(
                    user_id=user_id, date=current_date).one()
                entry.steps = entry.steps + steps
                entry.distance = entry.distance + distance
                entry.duration = entry.duration + duration
                entry.calories_burned = entry.calories_burned + calories_burned
            except NoResultFound:
                try:
                    new_entry = StepData(user_id=user_id, date=current_date, steps=steps, distance=distance, duration=duration, calories_burned=calories_burned)
                    db.session.add(new_entry)
                except IntegrityError as e:
                    db.session.rollback()
                    error_info = e.orig.args[0]
                    return dict(status="error", message=f"IntegrityError: {error_info}"), HTTPStatus.INTERNAL_SERVER_ERROR
            db.session.commit()
            return dict(status="success",
                        message=f"Steps for user: {user_id} updated. Got {steps} steps.")
        except IntegrityError as e:
            db.session.rollback()
            error_info = e.orig.args[0]
            return dict(status="error", message=f"IntegrityError: {error_info}"), HTTPStatus.INTERNAL_SERVER_ERROR
        except Exception as e:
            return dict(status="success",
                        message=str(e))

    @step_ns.response(int(HTTPStatus.OK), "Food retrieved successfully.")
    @step_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def get(self, user_id):
        """Retrieve Steps by User ID."""
        try:
            daily_data = StepData.daily_steps(user_id)
            weekly_data = StepData.weekly_steps(user_id)
            monthly_data = StepData.monthly_steps(user_id)

            def parse_to_zero(data):
                if data is None:
                    return 0
                return data

            data = dict(
                user_id=user_id,
                daily=dict(steps=parse_to_zero(daily_data[0]), distance=parse_to_zero(daily_data[1]), duration=parse_to_zero(daily_data[2]), calories=parse_to_zero(daily_data[3])),
                last_week_distribution=StepData.last_week_distribution(user_id),
                weekly=dict(steps=parse_to_zero(weekly_data[0]), distance=parse_to_zero(weekly_data[1]), duration=parse_to_zero(weekly_data[2]), calories=parse_to_zero(weekly_data[3])),
                monthly=dict(steps=parse_to_zero(monthly_data[0]), distance=parse_to_zero(monthly_data[1]), duration=parse_to_zero(monthly_data[2]), calories=parse_to_zero(monthly_data[3])),
                weekly_distribution=StepData.weekly_distribution(user_id)
            )
            if data:
                return dict(status="success", message="Food retrieved successfully.", data=data)
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(e)
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @step_ns.response(int(HTTPStatus.OK), "Food deleted successfully.")
    @step_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def delete(self, user_id):
        """Delete Food by ID."""
        try:
            food = StepData.query.get(user_id)

            if food:
                db.session.delete(food)
                db.session.commit()
                return dict(status="success", message="Food deleted successfully.")
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
