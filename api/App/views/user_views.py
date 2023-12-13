"""
User View
"""


from flask import Blueprint, jsonify, request, session, \
    json
from sqlalchemy import and_

from ..models.user_models import *


# blueprint, plan url
user_blue = Blueprint('user', __name__, url_prefix='/user')



@user_blue.route('/login/', methods=['POST'])
def post_user_login():
    # Use current_app to get the application instance
    data = request.json
    if data is None:
        return jsonify({"error": "JSON data not provided"}), 400
    if request.cookies.get('user_id') is not None:  # A user is logged in
        return jsonify({'error': 'Please logout first.'}), 401
    user_id = data.get('userId')
    password = data.get('password')
    auth = data.get('auth')



    # Search for the user in the database
    user = User.query.filter_by(user_id=user_id).first()

    if user:
        # Validate password and auth
        if user.password == password:
            user_data = {
                'userId': user.user_id,
                'name': user.name,
                'auth': user.auth
            }
            return jsonify(user_data), 201  # Return a JSON response with HTTP status code 201 (Created)
        else:
            return jsonify({'message': 'Invalid password or auth'}), 401  # Return 401 to indicate unauthorized
    else:
        return jsonify({'message': 'User not found'}), 404  # Return 404 to indicate not found


@user_blue.route('/register/', methods=['POST'])
def post_user_register():
    # Fetching json data
    data = request.json
    if data is None:
        return jsonify({"error": "JSON data not provided"}), 400
    user_id = data.get('userId')
    password = data.get('password')
    name = data.get('name')
    auth = data.get('auth')


    # Check if the user already exists
    existing_user = User.query.filter_by(user_id=user_id).first()

    if existing_user:
        return jsonify({'message': 'User already exists'}), 400

    # Create a new user
    new_user = User(user_id=user_id, password=password, name=name, auth=auth)
    db.session.add(new_user)
    db.session.commit()

    user_data = {
        'userId': new_user.user_id,
        'name': new_user.name,
        'auth': new_user.auth
    }
    return jsonify(user_data), 201  # Return a JSON response with HTTP status code 201 (Created)

# Logout function
@user_blue.route('/logout/', methods=['POST'])
def logout():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "JSON data not provided"}), 400
        user_id = data.get('userId')
        if user_id is None:
            return jsonify({'is_logged_in': False}), 401  # No user is currently logged in
        user = User.query.filter_by(user_id=user_id).first()
        if user is None:
            return jsonify({'error': 'The user does not exist.'}), 404  # The user does not exist

        response = jsonify({'is_logged_out': True})
        return response, 200  # You've logged out successfully. Goodbye
    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred.'}), 500
    
@user_blue.route('/user_info/', methods=['POST'])
def user_info():
    try:
        data = request.json
        if data is None:
            return jsonify({'error': 'JSON data not provided'}), 400
        user_id = data.get('userId')
        user = User.query.filter_by(user_id=user_id).first()
        if user is None:
            return jsonify({'error': 'User not found'}), 404
        user_data = {
            'userId': user.user_id,
            'name': user.name,
            'auth': user.auth
            }
        return jsonify(user_data), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred.'}), 500
    
@user_blue.route('/get_interviewees/', methods=['GET'])
def get_interviewees():
    try:
        users = User.query.filter_by(auth=0)
        user_list = []
        for user in users:
            user_data = {
                'id': user.user_id,
                'name': user.name
            }
            user_list.append(user_data)
        response_data = {
            'status': 0,
            'interviewees': user_data
        }
        return jsonify(response_data), 200
    except Exception as e:
        print(e)
        return jsonify({'error': 'An error occurred'}), 500