from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from exts import db
from route.user_route import create_router

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:liunb0905@localhost:3306/appointment'
db.init_app(app)
user_bp = create_router()
app.register_blueprint(user_bp)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
