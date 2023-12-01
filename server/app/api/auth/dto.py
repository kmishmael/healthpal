"""parsers and serializers for /auth API endpoints"""
from flask_restx import Model
from flask_restx.fields import String, Boolean
from flask_restx.inputs import email
from flask_restx.reqparse import RequestParser


auth_reqparser = RequestParser(bundle_errors=True)
auth_reqparser.add_argument(
    name="name", type=str, required=True, nullable=False
)
auth_reqparser.add_argument(
    name="email", type=email(), required=True, nullable=False
)
auth_reqparser.add_argument(
    name="password", type=str, required=True, nullable=False
)


auth_login_reqparser = RequestParser(bundle_errors=True)
auth_login_reqparser.add_argument(
    name="email", type=email(), required=True, nullable=False
)
auth_login_reqparser.add_argument(
    name="password", type=str, required=True, nullable=False
)


user_model = Model(
    "User",
    {
        "email": String,
        "name": String,
        "role": String,
        "registered_on": String(attribute="registered_on_str"),
        "token_expires_in": String,
    },
)
