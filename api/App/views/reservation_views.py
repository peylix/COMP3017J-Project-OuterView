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
        # Fetch the data as a string
        data = request.args.get('userId')
        # if data is None:
        #     return jsonify({"error": "JSON data not provided"}), 400
        user_id = data


        if user_id != None: 
            # Retrieve reservations of a particular user
            reservations = Reservation.query.join(Participant, Reservation.id == Participant.reservation_id).filter(Participant.user_id == user_id).all()
            participants = Participant.query.join(Reservation, Reservation.id == Participant.reservation_id).all()
  
        else:
            # Retrieve all reservations from the database
            reservations = Reservation.query.all()
            participants = Participant.query.join(Reservation, Reservation.id == Participant.reservation_id).all()

        reservations_data = []

        for reservation in reservations:
            # if reservation.detail and isinstance(reservation.detail, bytes):
            #     reservation.detail = reservation.detail.decode('utf-8')
            # reservation_user_id = [participant.user_id for participant in reservation.participants if participant.role == 0]
            reservation_data = {
                'id': reservation.id,
                'name': reservation.name,
                'startTimeLimit': reservation.start_time_limit,
                'endTimeLimit': reservation.end_time_limit,
                'status': reservation.state,
                'interview': [participant.to_dict() for participant in participants],
                # 'detail': reservation.detail,
                # 'dates': [date.date.strftime('%Y-%m-%d') for date in reservation.dates]
            }
            reservations_data.append(reservation_data)

        # Prepare the response data
        response = {
            'meetings': reservations_data,
            'status': 1
        }

        return jsonify(response)  # Return a JSON response

    except Exception as e:
        # Handle exceptions and return an error response
        response = {
            'code': 0,
            'error_message': str(e)
        }
        return jsonify(response), 500  # HTTP status code 500 for internal server error


@reservation_blue.route('/create_reservation', methods=['POST'])
def create_reservation():
    try:
        # Fetch the data as a string
        new_reservation_data = request.json
        if new_reservation_data is None:
            return jsonify({"error": "JSON data not provided"}), 400
        if new_reservation_data.get('type') == False:
            return jsonify({"error": "type is not for creating"}), 401
        name = new_reservation_data.get('name')
        start = new_reservation_data.get('start')
        end = new_reservation_data.get('end')
        invitees = new_reservation_data.get('invitees')
        # if (time.time() - start) < 0:
        #     return jsonify({"error": "start time is not valid"}), 402
        # if (end - start) < 0:
        #     return jsonify({"error": "end time is not valid"}), 403


        # Create a new reservation
        new_reservation = Reservation(
            name=name,
            start_time_limit=start,
            end_time_limit=end,
            state=False
        )

        for invitee in invitees:
            new_participant = Participant(
                user_id=invitee,
                role=1
            )
            new_reservation.participants.append(new_participant)

        # Add the new reservation to the database
        db.session.add(new_reservation)
        db.session.commit()

        # Prepare the response data
        response = {
            'status': 0
        }

        return jsonify(response), 201  # Return a JSON response with HTTP status code 201 (Created)

    except Exception as e:
        # Handle exceptions and return an error response
        response = {
            'error_message': str(e),
            'status': 1
        }
        return jsonify(response), 500
    

@reservation_blue.route('/delete_reservation', methods=['DELETE'])
def delete_reservation():
    try:
        # Fetch the data as a string
        delete_reservation_data = request.json
        if delete_reservation_data is None:
            return jsonify({"error": "JSON data not provided"}), 400
        reservation_id = delete_reservation_data.get('meetingId')
        reservation = Reservation.query.filter_by(id=reservation_id).first()
        participants = Participant.query.filter_by(reservation_id=reservation_id).all()
        if reservation is None:
            return jsonify({"error": "reservation does not exist"}), 402
        db.session.delete(reservation)
        for participant in participants:
            db.session.delete(participant)
        db.session.commit()
        response = {
            'status': 0
        }
        return jsonify(response), 201  # Return a JSON response with HTTP status code 201 (Created)

    except Exception as e:
        # Handle exceptions and return an error response
        response = {
            'error_message': str(e),
            'status': 1
        }
        return jsonify(response), 500
    

@reservation_blue.route('/get_into_room', methods=['POST'])
def get_into_room():
    try:
        # Fetch the data as a string
        get_into_room_data = request.json
        if get_into_room_data is None:
            return jsonify({"error": "JSON data not provided"}), 400
        user_id = get_into_room_data.get('userId')
        reservation_id = get_into_room_data.get('meetingId')
        reservation = Reservation.query.filter_by(id=reservation_id).first()
        if reservation is None:
            return jsonify({"error": "reservation does not exist"}), 402
        reservation.state = True
        db.session.commit()
        response = {
            'status': 0
        }
        return jsonify(response), 201  # Return a JSON response with HTTP status code 201 (Created)

    except Exception as e:
        # Handle exceptions and return an error response
        response = {
            'error_message': str(e),
            'status': 1
        }
        return jsonify(response), 500