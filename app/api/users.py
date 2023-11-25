"""users api"""

from flask import request
from flask_restful import Resource
import jwt
from app import app
from app.models.user import User
from ..db import db


class LoginResource(Resource):
    """login implementation"""

    def post(self):
        try:
            data = request.json()
            if not data:
                return {
                    'message': 'Please provide user details.',
                    'data': None,
                    'error': 'Bad request'
                }, 400
            # TODO: Validate input
            is_validated = True
            if is_validated is not True:
                return dict(message="Invalid data", data=None, error=is_validated), 400
            user = User().login(**data)
            if user:
                try:
                    # token should expire after 24 hrs
                    user["token"] = jwt.encode(
                        {"user_id": user["_id"]},
                        app.config["SECRET_KEY"],
                        algorithm="HS256"
                    )
                    return {
                        "message": "Successfully fetched auth token",
                        "data": user
                    }
                except Exception as e:
                    return {
                        "error": "Something went wrong",
                        "message": str(e)
                    }, 500
            return {
                "message": "Error fetching auth token!, invalid email or password",
                "data": None,
                "error": "Unauthorized"
            }, 404

        except Exception as e:
            pass

class UsersResource(Resource):
    """users api implementation"""

    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {'error': 'User Not Found.'}, 404
            return {'user': user.to_dict()}, 200
        else:
            users = User.query.all()
            return {'users': [user.to_dict() for user in users]}, 200

        # create
    def post(self):
        try:
            data = request.get_json()
            if not data:
                return {
                    "message": 'Please provide user details',
                    "data": None,
                    "error": "Bad request"
                }, 400
            # TODO: validate the data here
            new_user = User(**data)
            db.session.add(new_user)
            db.session.commit()
            return {'message': 'Successfully created new user'}, 201
        except Exception as e:
            return {
                "message": "Something went wrong",
                "error": str(e),
                data: None
            }, 500

    # update
    def put(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        if not username or not email:
            return {'error': 'Username and email are required'}, 400
        user.username = username
        user.email = email
        db.session.commit()
        return {'message': 'User updated successfully'}, 200

    # delete
    def delete(self, user_id):
        user = User.query.get(user_id)
        if not user:
            return {'error': 'User not found'}, 404
        db.session.delete(user)
        db.session.commit()
        return {'message': 'User deleted successfully'}, 200
