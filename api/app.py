from flask import Flask
from route.reservation_route import create_reservation_router
from exts import db
from route.user_route import create_user_router

# Create a Flask application instance
app = Flask(__name__)

# Configure the database connection, replace with your own database details
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost:3306/appointment'
# Initialize the Flask-SQLAlchemy extension
db.init_app(app)

# Create blueprints using route functions
user_bp = create_user_router()
reservation_bp = create_reservation_router()

# Register the blueprints with the Flask app
app.register_blueprint(user_bp)
app.register_blueprint(reservation_bp)

# Run the Flask application if this script is the main entry point
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
