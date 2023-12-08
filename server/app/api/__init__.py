"""API blueprint configuration"""

from flask import Blueprint
from flask_restx import Api

from app.api.auth.endpoints import auth_ns
from app.api.exercises.endpoints import exercises_ns
from app.api.food.endpoints import food_ns, food_create_ns
from app.api.exercise.endpoints import exercise_ns
from app.api.steps.endpoints import step_ns
from app.api.water_intake.endpoints import water_intake_ns
from app.api.meals.endpoints import meal_ns, meal_item_ns

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
api.add_namespace(food_create_ns, path="/food")
api.add_namespace(food_ns, path="/food")
api.add_namespace(step_ns, path="/steps")
api.add_namespace(water_intake_ns, path="/water_intake")
api.add_namespace(meal_ns, path='/meals')
api.add_namespace(meal_item_ns, path='/meals')

api.add_namespace(exercise_ns, path="/exercise")

api.add_namespace(exercises_ns, path='/exercises')
