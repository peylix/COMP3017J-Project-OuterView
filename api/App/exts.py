# Function: Initialize extensions
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()  # ORM
migrate = Migrate()  # data migration


def init_exts(app):
    db.init_app(app=app)
    migrate.init_app(app=app, db=db)

