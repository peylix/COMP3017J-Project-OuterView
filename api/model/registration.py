from api.exts import db


class Registration(db.Model):
    __tablename__ = 'registration'

    id = db.Column(db.Integer, primary_key=True)
    reservation_id = db.Column(db.Integer, db.ForeignKey('reservation.id'))
    time = db.Column(db.Time, default=None)
    userId = db.Column(db.String(255), db.ForeignKey('user.userId'))

    dates = db.relationship('RegistrationDate', backref='registration', lazy=True)


class RegistrationDate(db.Model):
    __tablename__ = 'registration_date'

    id = db.Column(db.Integer, primary_key=True)
    registration_id = db.Column(db.Integer, db.ForeignKey('registration.id'))
    selected_date = db.Column(db.Date, default=None)
