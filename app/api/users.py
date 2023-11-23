"""users api"""

from flask_restful import Resource
from models.user import User
from app import db

class Users(Resource):
    """users api implementation"""
    def get(self, user_id=None):
        if user_id:
            user = User.query.get(user_id)
            if not user:
                return {'error': 'User Not Found.'}, 404
            return {'user': user}, 200
        else:
            users = User.query.all()
            return {'users': [user.to_dict() for user in users]}, 200

        # create
    def post(self):
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        if not username or not email:
            return {'error': 'Username and email are required'}, 400
        new_user = User(username=username, email=email)
        db.session.add(new_user)
        db.session.commit()
        return {'message': 'User added successfully'}, 201

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
