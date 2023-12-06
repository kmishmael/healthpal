"""API Endpoints definitions for /steps namespace"""
from http import HTTPStatus
from flask import jsonify

from flask_restx import Namespace, Resource
from app import db

from app.api.steps.dto import steps_reqparser, step_model
from app.models.steps import StepData
from datetime import date
from sqlalchemy.orm.exc import NoResultFound

step_ns = Namespace(name="steps", validate=True)

step_ns.models[step_model.name] = step_model


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
            current_date = date.today()
            try:
                entry = db.session.query(StepData).filter_by(
                    user_id=user_id, date=current_date).one()
                entry.steps = entry.steps + steps
            except NoResultFound:
                new_entry = StepData(
                    user_id=user_id, date=current_date, steps=steps)
                db.session.add(new_entry)
            db.session.commit()
            return dict(status="success",
                        message=f"Steps for user: {user_id} updated. Got {steps} steps.")
        except Exception as e:
            return dict(status="success",
                        message=str(e))

    @step_ns.response(int(HTTPStatus.OK), "Food retrieved successfully.")
    @step_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def get(self, user_id):
        """Retrieve Steps by User ID."""
        # TODO: get rebust data for weekly, daily and make calculations and estimates for calories and other things
        try:
            food = StepData.query.filter_by(user_id=user_id).first()
            print('FOOD => ', food)
            if food:
                return dict(status="success", message="Food retrieved successfully.", data=dict(user_id=food.user_id, steps=food.steps))
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
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
