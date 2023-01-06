from .db import db, environment, SCHEMA, add_prefix_for_prod

class Theme(db.Model):
    '''
    This class is responsible for storing the users background, board, and piece choices
    '''

    __tablename__='themes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, nullable=False, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    theme_name = db.Column(db.String(25), nullable=False)
    background = db.Column(db.String(25), nullable=False)
    light_squares = db.Column(db.String(25), nullable=False)
    dark_squares = db.Column(db.String(25), nullable=False)
    piece_name = db.Column(db.String(25), nullable=False)
    url = db.Column(db.String(500))

    user = db.relationship('User', back_populates='theme')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'theme_name': self.theme_name,
            'background': self.background,
            'light_squares': self.light_squares,
            'dark_squares': self.dark_squares,
            'piece_name': self.piece_name,
            'url': self.url
        }
