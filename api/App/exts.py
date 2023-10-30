# Function: Initialize extensions
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()  # ORM
migrate = Migrate()  # data migration
cors = CORS()  # Cross-origin request


def init_exts(app):
    db.init_app(app=app)
    migrate.init_app(app=app, db=db)
    cors.init_app(app, origins="*")  