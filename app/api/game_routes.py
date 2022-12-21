from flask import Blueprint, json, request
from flask_login import login_required
from ..models import Game, db, User
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

game_routes = Blueprint('games', __name__)

@game_routes.route('/')
@login_required
def get_users_games():
    '''
    Querry all the games belonging to the current logged in user.
    '''
    user = current_user.to_dict()
    user_white_games = {}
    user_black_games = {}

    for game in current_user.game_as_white:
        user_white_games[game.id] = game.to_dict()

    for game in current_user.game_as_black:
        user_black_games[game.id] = game.to_dict()

    return {'user': user, 'user_white_games': user_white_games, 'user_black_games': user_black_games}