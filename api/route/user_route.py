from flask import Blueprint
from exts import db
from flask import request, jsonify, current_app # 导入 current_app
from model.user import User  # 导入模型



def create_router():
    user_bp = Blueprint('user_bp', __name__)
    @user_bp.route('/index', methods=['GET'])
    def index():
        return 'Index'

    @user_bp.route('/user/login', methods=['POST'])
    def post_user_login():
        # 使用 current_app 获取应用程序实例
        app = current_app._get_current_object()
        data = request.get_json()
        userId = data.get('userId')
        password = data.get('password')
        auth = data.get('auth')

        # 在数据库中查找用户
        user = User.query.filter_by(userId=userId).first()

        if user:
            # 验证密码和auth
            if user.password == password and user.auth == int(auth):
                user_data = {
                    'userId': user.userId,
                    'name': user.name,
                    'auth': user.auth
                }
                return jsonify(user_data)
            else:
                return jsonify({'message': 'Invalid password or auth'}), 401  # 返回401表示未授权
        else:
            return jsonify({'message': 'User not found'}), 404

    @user_bp.route('/user/register', methods=['POST'])
    def post_user_register():
        app = current_app._get_current_object()
        data = request.get_json()
        userId = data.get('userId')
        password = data.get('password')
        name = data.get('name')
        auth = data.get('auth')
        # 检查用户是否已存在
        existing_user = User.query.filter_by(userId=userId).first()

        if existing_user:
            return jsonify({'message': 'User already exists'}), 400

        # 创建新用户
        new_user = User(userId=userId, password=password, name=name, auth=auth)
        db.session.add(new_user)
        db.session.commit()

        user_data = {
            'userId': new_user.userId,
            'name': new_user.name,
            'auth': new_user.auth
        }
        return jsonify(user_data), 201
    return user_bp