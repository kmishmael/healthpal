"""API endpoint definitions for /food namespace."""
from http import HTTPStatus

from flask_restx import Namespace, Resource
from app import db

from app.api.food.dto import food_reqparser, food_model, meal_allocation_model, meal_model, meal_reqparser, meal_allocation_reqparser
from app.models.food import Food
from app.models.meals import Meal
from app.models.meal_allocation import MealAllocation


food_ns = Namespace(name="food", validate=True)
meals_ns = Namespace(name="meals", validate=True)
meal_allocation_ns = Namespace(name="exercise-allocation", validate=True)

food_ns.models[food_model.name] = food_model
meals_ns.models[meal_model.name] = meal_model
meal_allocation_ns.models[meal_allocation_model.name] = meal_allocation_model


@food_ns.route("/", endpoint="food_create")
class FoodResource(Resource):
    """Handles HTTP requests to URL: /api/v1/food"""

    @food_ns.expect(food_reqparser)
    @food_ns.doc(security="Bearer")
    @food_ns.response(int(HTTPStatus.CREATED), "New Food was successfully created.")
    @food_ns.response(int(HTTPStatus.CONFLICT), "Duplicate food id")
    @food_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @food_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Create a new Food."""
        try:
            request_data = food_reqparser.parse_args()
            new_user = Food(**request_data)
            db.session.add(new_user)
            db.session.commit()
            return dict(status="success",
                        message="Food created successfully.")
        except Exception as e:
            return dict(status="success",
                        message=str(e))

    @food_ns.doc(security="Bearer")
    @food_ns.response(int(HTTPStatus.OK), "Token is currently valid.", food_model)
    @food_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @food_ns.response(int(HTTPStatus.UNAUTHORIZED), "Token is invalid or expired.")
    @food_ns.marshal_with(food_model, as_list=True)
    def get(self):
        """Validate access token and return user info."""
        meals  = db.food.find()
        return meals


@food_ns.route("/<int:food_id>", endpoint="food_rud")
class FoodRUDResponse(Resource):
    """Handles HTTP requests to: /api/v1/food/<food_id>"""

    @food_ns.response(int(HTTPStatus.OK), "Food retrieved successfully.")
    @food_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def get(self, food_id):
        """Retrieve Food by ID."""
        try:
            food = Food.query.get(food_id)

            if food:
                return dict(status="success", message="Food retrieved successfully.", data=food.serialize())
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


    @food_ns.response(int(HTTPStatus.OK), "Food updated successfully.")
    @food_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def put(self, food_id):
        """Update Food by ID."""

        args = food_reqparser.parse_args()

        try:
            food = Food.query.get(food_id)

            if food:
                for key, value in args.items():
                    if value is not None:
                        setattr(food, key, value)

                db.session.commit()
                return dict(status="success", message="Food updated successfully.")
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


    @food_ns.response(int(HTTPStatus.OK), "Food deleted successfully.")
    @food_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def delete(self, exercise_id):
        """Delete Food by ID."""
        try:
            food = Food.query.get(exercise_id)

            if food:
                db.session.delete(food)
                db.session.commit()
                return dict(status="success", message="Food deleted successfully.")
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


@meals_ns.route("/", endpoint="meals_create")
class ExercisesResource(Resource):
    """Handles HTTP requests to URL: /api/v1/exercises"""

    @meals_ns.expect(meal_reqparser)
    @meals_ns.doc(security="Bearer")
    @meals_ns.response(int(HTTPStatus.CREATED), "Meal created successfully.")
    @meals_ns.response(int(HTTPStatus.CONFLICT), "Error: Conflict")
    @meals_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @meals_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Register a new exercise."""
        try:
            request_data = meal_reqparser.parse_args()
            new_user = Meal(**request_data)
            db.session.add(new_user)
            db.session.commit()
            return dict(status="success",
                        message="Meal created successfully.")
        except Exception as e:
            return dict(status="success",
                        message=str(e))

    @meals_ns.doc(security="Bearer")
    @meals_ns.response(int(HTTPStatus.OK), "Token is currently valid.", meal_model)
    @meals_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @meals_ns.response(int(HTTPStatus.UNAUTHORIZED), "Token is invalid or expired.")
    @meals_ns.marshal_with(meal_model, as_list=True)
    def get(self):
        """Validate access token and return user info."""
        meals = db.meals.find()
        return meals


@meal_allocation_ns.route("/allocation", endpoint="meal_allocation_create")
class MealCreateAllocation(Resource):
    """Handles HTTP requests to URL: /api/v1/meals/allocation"""

    @meal_allocation_ns.expect(meal_allocation_reqparser)
    @meal_allocation_ns.doc(security="Bearer")
    @meal_allocation_ns.response(int(HTTPStatus.CREATED), "New Meal Allocation was successfully created.")
    @meal_allocation_ns.response(int(HTTPStatus.CONFLICT), "Meal Allocation already created.")
    @meal_allocation_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @meal_allocation_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Register a new user and return an access token."""
        try:
            request_data = meal_allocation_reqparser.parse_args()
            new_meal_allocation = MealAllocation(**request_data)
            db.session.add(new_meal_allocation)
            db.session.commit()
            return dict(status="success",
                        message="Exercise Allocation done successfully.")
        except Exception as e:
            return dict(status="success",
                        message=str(e))

@meal_allocation_ns.route("/allocation/<int:user_id>", endpoint="meal_allocation")
class MealRUDAllocation(Resource):
    """Handles HTTP requests to URL: /api/v1/meals/allocation/<int:user_id>"""

    @meal_allocation_ns.response(int(HTTPStatus.OK), "Exercise retrieved successfully.")
    @meal_allocation_ns.response(int(HTTPStatus.NOT_FOUND), "Exercise not found.")
    def get(self, user_id):
        """Retrieve Meal Allocation by user id."""
        try:
            exercise = MealAllocation.query.get(user_id)

            if exercise:
                return dict(status="success", message="Exercise retrieved successfully.", data=exercise.serialize())
            else:
                return dict(status="error", message="Exercise not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


    @meal_allocation_ns.response(int(HTTPStatus.OK), "Meal updated successfully.")
    @meal_allocation_ns.response(int(HTTPStatus.NOT_FOUND), "Meal not found.")
    def put(self, user_id):
        """Update exercise by ID."""

        args = meal_allocation_reqparser.parse_args()

        try:
            meal = MealAllocation.query.get(user_id)

            if meal:
                for key, value in args.items():
                    if value is not None:
                        setattr(meal, key, value)

                db.session.commit()
                return dict(status="success", message="Meal allocation updated successfully.")
            else:
                return dict(status="error", message="Meal Allocation not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR


    @meal_allocation_ns.response(int(HTTPStatus.OK), "Meal Allocation deleted successfully.")
    @meal_allocation_ns.response(int(HTTPStatus.NOT_FOUND), "Meal Allocation not found.")
    def delete(self, exercise_id):
        """Delete Meal allocation by ID."""
        try:
            exercise = MealAllocation.query.get(exercise_id)

            if exercise:
                db.session.delete(exercise)
                db.session.commit()
                return dict(status="success", message="Meal Allocation deleted successfully.")
            else:
                return dict(status="error", message="Meal Allocation not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
