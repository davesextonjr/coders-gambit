from flask import Blueprint, json, request, session, jsonify
from sqlalchemy import select
from ..models import db
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

theme_routes = Blueprint('themes', __name__)

@theme_routes.route('')
@login_required
def get_user_themes():
    '''
    Find and return all the users saved themes.
    '''
    pass


@theme_routes.route('/new', methods=['POST'])
@login_required
def create_new_theme():
    '''
    Creates a new theme
    '''
    pass
