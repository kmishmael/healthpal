from http import HTTPStatus
from flask import jsonify, request

from flask_restx import Namespace, Resource
from app import db

from app.api.meals.dto import meal_parser, meal_model
from app.models.meals import Meal
from app.models.user import User
from datetime import date
from sqlalchemy.orm.exc import NoResultFound
from datetime import datetime

meal_ns = Namespace(name="meals", validate=True)

meal_ns.models[meal_model.name] = meal_model


@meal_ns.route("/<int:user_id>", endpoint="meals_crud")
class MealsResponse(Resource):
    """Handles HTTP requests to: /api/v1/meals/<user_id>"""

    @meal_ns.expect(meal_parser)
    @meal_ns.doc(security="Bearer")
    @meal_ns.response(int(HTTPStatus.CREATED), "Meal created successfully.")
    @meal_ns.response(int(HTTPStatus.CONFLICT), "Duplicate meal id")
    @meal_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @meal_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self, user_id):
        """Create a new Meal."""
        try:
            request_data = meal_parser.parse_args()
            meals = request_data.get("meals")

            # Your meal creation logic here...

            return dict(status="success",
                        message=f"Meals for user: {user_id} created. Got {meals} meals.")
        except Exception as e:
            return dict(status="error",
                        message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @meal_ns.response(int(HTTPStatus.OK), "Meals retrieved successfully.")
    @meal_ns.response(int(HTTPStatus.NOT_FOUND), "Meals not found.")
    def get(self, user_id):
        """Retrieve Meals by User ID."""
        try:
            specific_date = request.args.get('specific_date')
            if specific_date:
                specific_date = datetime.strptime(
                    specific_date, '%Y-%m-%d').date()

            meals_data = Meal.get_days_menu(user_id, specific_date)

            if meals_data:
                return dict(status="success", message="Meals retrieved successfully.", data=meals_data)
            else:
                return dict(status="error", message="Meals not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            print(e)
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @meal_ns.response(int(HTTPStatus.OK), "Meals deleted successfully.")
    @meal_ns.response(int(HTTPStatus.NOT_FOUND), "Meals not found.")
    def delete(self, user_id):
        """Delete Meals by User ID."""
        try:
            specific_date = request.args.get('specific_date')
            if specific_date:
                specific_date = datetime.strptime(
                    specific_date, '%Y-%m-%d').date()

            meals = Meal.query.filter_by(
                user_id=user_id, date=specific_date).all()

            if meals:
                for meal in meals:
                    db.session.delete(meal)
                db.session.commit()
                return dict(status="success", message="Meals deleted successfully.")
            else:
                return dict(status="error", message="Meals not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
