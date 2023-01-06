from flask import Blueprint, json, request, session, jsonify
from sqlalchemy import select
from ..forms import NewGameForm, UpdateGameForm
from ..models import Game, db, User
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user

game_routes = Blueprint('games', __name__)

@game_routes.route('')
@login_required
def get_users_games():
    '''
    Querry all the games belonging to the current logged in user.
    '''
    user = current_user.to_dict()
    print("!!!!!!!!!!!!!!!!!!!!WEREHERE", user)

    user_white_games = {}
    user_black_games = {}

    for game in current_user.game_as_white:
        user_white_games[game.id] = game.to_dict()

    for game in current_user.game_as_black:
        user_black_games[game.id] = game.to_dict()

    return {'user': user, 'user_white_games': user_white_games, 'user_black_games': user_black_games}


@game_routes.route('/<id>')
def get_game_by_id(id):
    '''
    Qerry for a specific game
    '''
    game = Game.query.get(id)
    return game.to_dict()

@game_routes.route('/<id>', methods=['DELETE'])
@login_required
def delete_game(id):
    game = Game.query.get(id)
    db.session.delete(game)
    db.session.commit()
    return {'Message': 'Game successfully deleted'}

@game_routes.route('/new', methods=['POST'])
def create_new_game():
    """
    Creates new game
    """
    form = NewGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game = Game(
            white_id=form.data['white_id'],
            black_id=form.data['black_id'],
            moves=form.data['moves'],
            current_board_state=form.data['current_board_state']
        )
        db.session.add(game)
        db.session.commit()
        return game.to_dict()
    return {'errors': validation_errors_to_error_messages}

@game_routes.route('/update', methods=['PUT'])
def update_game():
    """
    Updates the Game
    """
    form = UpdateGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
       edited_game = json.loads(request.data.decode('UTF-8'))
       game = Game.query.get(edited_game['id'])
       game.moves = edited_game['moves']
       game.current_board_state = edited_game['current_board_state']
       db.session.commit()
       saved_game = game.to_dict()
       return saved_game

    return {'errors': validation_errors_to_error_messages}
