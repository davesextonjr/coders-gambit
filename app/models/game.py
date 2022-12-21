from .db import db, environment, SCHEMA, add_prefix_for_prod


class Game(db.Model):

    """
    This class is responsible for keeping track of the game play as well as the id of the two players.
    """

    __tablename__='games'

    # ALL models should have this!!!
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    white_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    black_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    moves = db.Column(db.String(5000))



    user_as_white = db.relationship('User', foreign_keys=white_id, back_populates='game_as_white')
    user_as_black = db.relationship('User', foreign_keys=black_id,  back_populates='game_as_black')

    def to_dict(self):
        return {
            'id': self.id,
            'white_id': self.white_id,
            'black_id': self.black_id,
            'moves': self.moves
        }
