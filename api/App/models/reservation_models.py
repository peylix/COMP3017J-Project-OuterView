"""
Models for "Reservation". 
"""
from datetime import datetime

from sqlalchemy import ForeignKey, CheckConstraint

from .user_models import User
from ..exts import db

    
# Create a Reservation class that corresponds to the 'reservation' table in the database
class Reservation(db.Model):
    __tablename__ = 'reservation'

    # Define columns in the 'reservation' table
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    start_time_limit = db.Column(db.Time, nullable=False)
    end_time_limit = db.Column(db.Time, nullable=False)
    state = db.Column(db.Integer, nullable=False, comment='0: Not Started, 1: In Progress, 2: Finished')
    detail = db.Column(db.Text)
    evaluation = db.Column(db.Text)
    date = db.Column(db.Date, default=None)

    # Define the relationship with participants
    participants = db.relationship('Participant', backref='reservation', lazy=True)

    def __repr__(self):
        return f'{self.id}'

# Create a ReservationDate class that corresponds to the 'reservation_date' table in the database
# class ReservationDate(db.Model):
#     __tablename__ = 'reservation_date'

#     # Define columns in the 'reservation_date' table
#     id = db.Column(db.Integer, primary_key=True)
#     reservation_id = db.Column(db.Integer, db.ForeignKey('reservation.id'), nullable=False)
#     date = db.Column(db.Date, default=None)

#     def __repr__(self):
#         return f'{self.id} + {self.reservation_id}'
    

# Create a Participant class that corresponds to the 'participant' table in the database
class Participant(db.Model):
    __tablename__ = 'reservation_participant'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.String(255), ForeignKey(User.user_id), nullable=False)
    reservation_id = db.Column(db.Integer, ForeignKey(Reservation.id), nullable=False)
    role = db.Column(db.Integer, nullable=False, comment='0: Initiator, 1: Regular Participant')

    

    def __repr__(self):
        return f'{self.id} + {self.user_id} + {self.reservation_id}'
