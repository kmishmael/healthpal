from http import HTTPStatus
from flask import jsonify
from flask_restx import Namespace, Resource
from app import db
from app.api.food.dto import food_model, food_parser # Make sure to import the appropriate DTOs
from app.models.food import Food, FoodType
from sqlalchemy.orm.exc import NoResultFound

food_ns = Namespace(name="food", validate=True)
food_create_ns = Namespace(name="food_create", validate=True)


food_ns.models[food_model.name] = food_model

@food_create_ns.route("/", endpoint="food_c")
class FoodCreateResource(Resource):
    """Handles HTTP requests to: /api/v1/food"""

    @food_create_ns.expect(food_parser)
    @food_create_ns.doc(security="Bearer")
    @food_create_ns.response(int(HTTPStatus.CREATED), "Food created successfully.")
    @food_create_ns.response(int(HTTPStatus.CONFLICT), "Duplicate food id")
    @food_create_ns.response(int(HTTPStatus.BAD_REQUEST), "Validation error.")
    @food_create_ns.response(int(HTTPStatus.INTERNAL_SERVER_ERROR), "Internal server error.")
    def post(self):
        """Create a new Food."""
        try:
            request_data = food_parser.parse_args()
            new_food = Food(**request_data)
            db.session.add(new_food)
            db.session.commit()
            return dict(status="success", message=f"Food with id {new_food.id} created.")
        except Exception as e:
            import traceback
            traceback.print_exc()
            return dict(status="error", message=str(e))


@food_ns.route("/<int:food_id>", endpoint="food_crud")
class FoodResponse(Resource):
    """Handles HTTP requests to: /api/v1/food/<food_id>"""

    @food_ns.response(int(HTTPStatus.OK), "Food retrieved successfully.")
    @food_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def get(self, food_id):
        """Retrieve Food by ID."""
        try:
            food = Food.query.get(food_id)
            if food:
                return dict(status="success", message="Food retrieved successfully.", data=food.to_dict())
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @food_ns.response(int(HTTPStatus.OK), "Food updated successfully.")
    @food_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def put(self, food_id):
        """Update Food by ID."""
        try:
            food = Food.query.get(food_id)
            if food:
                request_data = food_parser.parse_args()
                for key, value in request_data.items():
                    setattr(food, key, value)
                db.session.commit()
                return dict(status="success", message="Food updated successfully.")
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR

    @food_ns.response(int(HTTPStatus.OK), "Food deleted successfully.")
    @food_ns.response(int(HTTPStatus.NOT_FOUND), "Food not found.")
    def delete(self, food_id):
        """Delete Food by ID."""
        try:
            food = Food.query.get(food_id)
            if food:
                db.session.delete(food)
                db.session.commit()
                return dict(status="success", message="Food deleted successfully.")
            else:
                return dict(status="error", message="Food not found."), HTTPStatus.NOT_FOUND
        except Exception as e:
            return dict(status="error", message=str(e)), HTTPStatus.INTERNAL_SERVER_ERROR
