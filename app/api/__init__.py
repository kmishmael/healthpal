"""API blueprint configuration"""

from flask import Blueprint
from flask_restx import Api

api_blueprint = Blueprint("api", __name__, url_prefix="/api/v1")
authorizations = {"Bearer": {"type": "apiKey", "in": "header", "name": "Authorization"}}

api = Api(
    api_blueprint,
    version="1.0",
    title="Healthpal API with JWT-Based Authentication",
    description="Welcome to the Swagger UI documentation site!",
    doc="/ui",
    authorizations=authorizations,
)