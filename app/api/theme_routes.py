from flask import Blueprint, json, request, session, jsonify
from sqlalchemy import select
from ..models import db
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

theme_routes = Blueprint('themes', __name__)
