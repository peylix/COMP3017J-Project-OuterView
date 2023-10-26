from flask import Blueprint
from exts import db
from flask import request, jsonify, current_app # 导入 current_app
from model.user import User  # 导入模型


def create_user_router():
    user_bp = Blueprint('user_bp', __name__)
    @user_bp.route('/index', methods=['GET'])
    def index():
        return 'Index'

    @user_bp.route('/user/login', methods=['POST'])
    def post_user_login():
        # Use current_app to get the application instance
        app = current_app._get_current_object()
        data = request.get_json()
        userId = data.get('userId')
        password = data.get('password')
        auth = data.get('auth')

        # Search for the user in the database
        user = User.query.filter_by(userId=userId).first()

        if user:
            # Validate password and auth
            if user.password == password and user.auth == int(auth):
                user_data = {
                    'userId': user.userId,
                    'name': user.name,
                    'auth': user.auth
                }
                return jsonify(user_data), 201  # Return a JSON response with HTTP status code 201 (Created)
            else:
                return jsonify({'message': 'Invalid password or auth'}), 401  # Return 401 to indicate unauthorized
        else:
            return jsonify({'message': 'User not found'}), 404  # Return 404 to indicate not found

    @user_bp.route('/user/register', methods=['POST'])
    def post_user_register():
        # app = current_app._get_current_object()
        data = request.get_json()
        userId = data.get('userId')
        password = data.get('password')
        name = data.get('name')
        auth = data.get('auth')

        # Check if the user already exists
        existing_user = User.query.filter_by(userId=userId).first()

        if existing_user:
            return jsonify({'message': 'User already exists'}), 400

        # Create a new user
        new_user = User(userId=userId, password=password, name=name, auth=auth)
        db.session.add(new_user)
        db.session.commit()

        user_data = {
            'userId': new_user.userId,
            'name': new_user.name,
            'auth': new_user.auth
        }
        return jsonify(user_data), 201  # Return a JSON response with HTTP status code 201 (Created)
    return user_bp
