"""Unit tests for api.auth_register API endpoint."""
from http import HTTPStatus

from flask import url_for

from app.models.user import User

from tests.util import EMAIL, PASSWORD, register_user


SUCCESS = "successfully registered"

EMAIL_ALREADY_EXISTS = f"{EMAIL} is already registered"

def login_user(test_client, email=EMAIL, password=PASSWORD):
    return test_client.post(
        url_for("api.auth_login"),
        data=f"email={email}&password={password}",
        content_type="application/x-www-form-urlencoded",
    )
