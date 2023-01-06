from flask import Blueprint, json, request, session, jsonify
from sqlalchemy import select
from ..models import db, Theme
from ..forms import AddEditThemeForm
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

theme_routes = Blueprint('themes', __name__)

@theme_routes.route('')
@login_required
def get_user_themes():
    '''
    Find and return all the users saved themes.
    '''

    user_themes = {}

    for theme in current_user.theme:
        user_themes[theme.id] = theme.to_dict()

    return user_themes



@theme_routes.route('/new', methods=['POST'])
@login_required
def create_new_theme():
    '''
    Creates a new theme
    '''
    form = AddEditThemeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        theme = Theme(
            user_id=form.data['user_id'],
            theme_name=form.data['theme_name'],
            background=form.data['background'],
            light_squares=form.data['light_squares'],
            dark_squares=form.data['dark_squares'],
            piece_name=form.data['piece_name'],
            url=form.data['url']
        )
        db.session.add(theme)
        db.session.commit()
        return theme.to_dict()
    return {'errors': validation_errors_to_error_messages}


@theme_routes.route('/update', methods=['PUT'])
@login_required
def update_game():
    """
    Updates one of the users current themes
    """
    form = AddEditThemeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
       edited_theme = json.loads(request.data.decode('UTF-8'))
       theme = Theme.query.get(edited_theme['id'])

       theme.theme_name = edited_theme['theme_name']
       theme.background = edited_theme['background']
       theme.light_squares = edited_theme['light_squares']
       theme.dark_squares = edited_theme['dark_squares']
       theme.piece_name = edited_theme['piece_name']
       theme.url = edited_theme['url']

       db.session.commit()
       saved_theme = theme.to_dict()
       return saved_theme

    return {'errors': validation_errors_to_error_messages}
