# __init__: This initializes the Flask application
import os

from flask import Flask
from dotenv import load_dotenv
from .views.user_views import user_blue
from .views.reservation_views import reservation_blue
from .utils.database_utils import read_database;
from .exts import init_exts

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # Project root directory
load_dotenv()  # Load environment variables


def create_app():
    # template_folder = os.path.join(BASE_DIR, 'templates')  # Specify the template folder
    static_folder = os.path.join(BASE_DIR, 'static')  # Specify the static folder

    app = Flask(__name__, static_folder=static_folder)
    app.json.sort_keys = False
    # Blueprint for Registration
    app.register_blueprint(blueprint=user_blue, url_prefix='/user')
    app.register_blueprint(blueprint=reservation_blue, url_prefix='/reservation')
    app.config['SECRET_KEY'] = '123'  # Configure the session secret
    # Configure the database
    # user_info = read_database()
    user_info = read_database()
    USERNAME = user_info[0]
    PASSWORD = user_info[1]
    HOSTNAME = 'localhost'
    PORT = '3306'
    DATABASE = 'outerview'
    DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}'.format(
        USERNAME,
        PASSWORD,
        HOSTNAME,
        PORT,
        DATABASE
    )
    app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # 禁止对象追踪修改
    # 初始化插件
    init_exts(app=app)
    return app