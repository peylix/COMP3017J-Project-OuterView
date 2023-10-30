'''
Don't forget to register the blueprint
'''
from sqlalchemy import ForeignKey

from ..exts import db



class User(db.Model):
    __tablename__ = 'user'

    userId = db.Column(db.String(255), primary_key=True)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), default=None)
    auth = db.Column(db.Integer(), default=None, comment='0: user, 1: administor')



    def __repr__(self):
        return f'<User {self.userId}>'

