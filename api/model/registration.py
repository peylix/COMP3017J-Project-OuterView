from exts import db


# Create a Registration class that corresponds to the 'registration' table in the database
class Registration(db.Model):
    __tablename__ = 'registration'

    # Define columns in the 'registration' table
    id = db.Column(db.Integer, primary_key=True)
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservation.id'))
    time = db.Column(db.Time, default=None)
    userId = db.Column(db.String(255), db.ForeignKey('user.userId'))

    # Define a relationship with the RegistrationDate table
    dates = db.relationship('RegistrationDate', backref='registration', lazy=True)


# Create a RegistrationDate class that corresponds to the 'registration_date' table in the database
class RegistrationDate(db.Model):
    __tablename__ = 'registration_date'

    # Define columns in the 'registration_date' table
    id = db.Column(db.Integer, primary_key=True)
    registration_id = db.Column(db.Integer, db.ForeignKey('registration.id'))
    selected_date = db.Column(db.Date, default=None)
