"""
Views for reservation
"""
from flask import Blueprint, jsonify, request, render_template, abort
from jinja2 import TemplateNotFound

from ..models.reservation_models import *

reservation_blue = Blueprint('reservation', __name__, url_prefix = '/reservation')


@reservation_blue.route('/get_reservations', methods=['GET'])
def get_reservations():
    try:
        data = request.json
        if data is None:
            return jsonify({"error": "JSON data not provided"}), 400
        page = data.get('page')
        per_page = data.get('per_page')
        user_id = data.get('user_id')

        if user_id is not '': 
            # Retrieve reservations of a particular user
            reservation = Reservation.query.filter(userId = user_id)
        else:
            # Retrieve all reservations from the database
            reservations = Reservation.query.all()

        reservations_data = []
        for reservation in reservations:
            if reservation.detail and isinstance(reservation.detail, bytes):
                reservation.detail = reservation.detail.decode('utf-8')
            reservation_data = {
                'id': reservation.id,
                'name': reservation.name,
                'startTimeLimit': reservation.startTimeLimit.strftime('%H:%M'),
                'endTimeLimit': reservation.endTimeLimit.strftime('%H:%M'),
                'userId': reservation.userId,
                'detail': reservation.detail,
                'dates': [date.date.strftime('%Y-%m-%d') for date in reservation.dates]
            }
            reservations_data.append(reservation_data)

        # Prepare the response data
        response = {
            'code': 0,
            'reservations': reservations_data
        }

        return jsonify(response)  # Return a JSON response

    except Exception as e:
        # Handle exceptions and return an error response
        response = {
            'code': 1,
            'error_message': str(e)
        }
        return jsonify(response), 500  # HTTP status code 500 for internal server error
