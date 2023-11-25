"""Unit tests for api.auth_register API endpoint."""
from http import HTTPStatus

from app.models.user import User

from tests.util import EMAIL, PASSWORD, register_user


SUCCESS = "successfully registered"

EMAIL_ALREADY_EXISTS = f"{EMAIL} is already registered"
