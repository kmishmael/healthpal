from http import HTTPStatus
from flask import jsonify, request

from flask_restx import Namespace, Resource
from app import db

from app.api.meals.dto import meal_parser, meal_model
from app.models.meals import Meal
from app.models.user import User
from datetime import date
from datetime import datetime

meal_ns = Namespace(name="meals", validate=True)
meal_item_ns = Namespace(name="meal_item", validate=True)

meal_ns.models[meal_model.name] = meal_model
meal_item_ns.models[meal_model.name] = meal_model


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

            new_meal = Meal(**request_data)
            db.session.add(new_meal)
            db.session.commit()
            return dict(status="success",
                        message=f"Meals for user: {user_id} created. Got meal id {new_meal.id}")
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

            daily_meals = Meal.get_days_menu(user_id, specific_date)
            monthly_meals = Meal.get_months_menu(user_id)

            data = dict(
                user_id=user_id,
                today=daily_meals,
                this_month=monthly_meals
            )

            if data:
                return dict(status="success", message="Meals retrieved successfully.", data=data)
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


@meal_item_ns.route("/<int:user_id>/<int:meal_id>", endpoint="meals_crud")
class MealItemResponse(Resource):
    """Handles HTTP requests to: /api/v1/meals/<user_id>"""

    @meal_item_ns.expect(meal_parser)
    @meal_item_ns.doc(security="Bearer")
    @meal_item_ns.response(int(HTTPStatus.CREATED), "Meal created successfully.")
    @meal_item_ns.response(int(HTTPStatus.CONFLICT), "Duplicate meal id")
    @meal_item_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @meal_item_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def put(self, user_id, meal_id):
        """Create a new Meal."""
        try:
            meal = Meal.query.get(meal_id)
            if meal:
                request_data = meal_parser.parse_args()
                for key, value in request_data.items():
                    setattr(meal, key, value)
                db.session.commit()
                return dict(status="success",
                            message=f"Meals for user: {user_id} updated. Updated meal id {meal.id}")
            else:
                return dict(status="error", message="Meal Item not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error",
                        message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @meal_item_ns.response(int(HTTPStatus.OK), "Meal Item retrieved successfully.")
    @meal_item_ns.response(int(HTTPStatus.NOT_FOUND), "Meals not found.")
    def get(self, user_id, meal_id):
        """Retrieve Meals by User ID."""
        try:

            meal = Meal.query.get(meal_id)

            data = meal.to_dict()

            if data:
                return dict(status="success", message="Meal Item retrieved successfully.", data=data)
            else:
                return dict(status="error", message="Meals not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            print(e)
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @meal_item_ns.response(int(HTTPStatus.OK), "Meals deleted successfully.")
    @meal_item_ns.response(int(HTTPStatus.NOT_FOUND), "Meals not found.")
    def delete(self, user_id, meal_id):
        """Delete Meals by User ID."""
        try:
            meal = Meal.query.get(meal_id)
            if meal:
                db.session.delete(meal)
                db.session.commit()
                return dict(status="success", message="Meal Item deleted successfully.")
            else:
                return dict(status="error", message="Meal Item not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
