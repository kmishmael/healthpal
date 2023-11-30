"""API blueprint configuration"""

from flask import Blueprint
from flask_restx import Api

from app.api.auth.endpoints import auth_ns
from app.api.exercises.endpoints import exercise_ns, exercises_ns, exercise_create_ns, exercise_allocation_ns
from app.api.food.endpoints import food_ns, meals_ns, meal_allocation_ns

api_blueprint = Blueprint("api", __name__, url_prefix="/api/v1")
authorizations = {"Bearer": {"type": "apiKey", "in": "header", "name": "Authorization"}}

api = Api(
    api_blueprint,
    version="1.0",
    title="Healthpal API with JWT-Based Authentication",
    description="Our Healthpal app API.",
    doc="/ui",
    authorizations=authorizations,
)

api.add_namespace(auth_ns, path="/auth")
api.add_namespace(exercises_ns, path="/exercises")
api.add_namespace(exercise_ns, path="/exercise")
api.add_namespace(exercise_create_ns, path="/exercises")
api.add_namespace(exercise_allocation_ns, path="/exercises")
api.add_namespace(food_ns, path="/food")
api.add_namespace(meals_ns, path="/meals")
api.add_namespace(meal_allocation_ns, path="/meals")