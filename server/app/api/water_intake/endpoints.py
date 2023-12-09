from http import HTTPStatus
from flask import jsonify
from flask_restx import Namespace, Resource
from app import db
from .dto import water_intake_reqparser, water_intake_model
from app.models.water_intake import WaterIntakes
from datetime import date
from app.models.user import User
from sqlalchemy.exc import IntegrityError

water_intake_ns = Namespace(name="water_intake", validate=True)
water_intake_ns.models[water_intake_model.name] = water_intake_model


@water_intake_ns.route("/<int:user_id>", endpoint="water_intake_crud")
class WaterIntakeResponse(Resource):
    """Handles HTTP requests to: /api/v1/water_intake/<user_id>"""

    @water_intake_ns.expect(water_intake_reqparser)
    @water_intake_ns.doc(security="Bearer")
    @water_intake_ns.response(int(HTTPStatus.CREATED), "Water intake updated successfully.")
    @water_intake_ns.response(int(HTTPStatus.CONFLICT), "Duplicate water intake entry")
    @water_intake_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @water_intake_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self, user_id):
        """Create a new water intake entry."""
        try:
            request_data = water_intake_reqparser.parse_args()
            amount = request_data.get("amount")

            user = User.query.get(user_id)

            # Assuming you want to save the water intake as an entry in the database
            new_entry = WaterIntakes(user_id=user_id, amount=amount)
            db.session.add(new_entry)
            db.session.commit()

            return dict(status="success", message=f"Water intake for user: {user_id} updated. Got {amount} ml.")
        except IntegrityError as e:
            db.session.rollback()
            error_info = e.orig.args[0]
            return dict(status="error", message=f"IntegrityError: {error_info}"), HTTPStatus.INTERNAL_SERVER_ERROR
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @water_intake_ns.response(int(HTTPStatus.OK), "Water intake retrieved successfully.")
    @water_intake_ns.response(int(HTTPStatus.NOT_FOUND), "Water intake not found.")
    def get(self, user_id):
        """Retrieve water intake by User ID."""
        try:
            daily_data = WaterIntakes.get_daily_intake(user_id)
            total_weekly_intake, weekly_data = WaterIntakes.get_weekly_intake(
                user_id)
            total_monthly_intake, monthly_data = WaterIntakes.get_monthly_intake(
                user_id)

            data = dict(
                user_id=user_id,
                daily=daily_data,
                weekly=dict(total=total_weekly_intake,
                            distribution=weekly_data),
                monthly=dict(total=total_monthly_intake,
                             distribution=monthly_data),
            )
            if data:
                return dict(status="success", message="Water intake retrieved successfully.", data=data)
            else:
                return dict(status="error", message="Water intake not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(e)

            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @water_intake_ns.response(int(HTTPStatus.OK), "Water intake deleted successfully.")
    @water_intake_ns.response(int(HTTPStatus.NOT_FOUND), "Water intake not found.")
    def delete(self, user_id):
        """Delete water intake entry by ID."""
        try:
            water_intake_entry = WaterIntakes.query.get(user_id)

            if water_intake_entry:
                db.session.delete(water_intake_entry)
                db.session.commit()
                return dict(status="success", message="Water intake deleted successfully.")
            else:
                return dict(status="error", message="Water intake not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
