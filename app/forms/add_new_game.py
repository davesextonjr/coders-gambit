from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class NewGameForm(FlaskForm):
    white_id = IntegerField('white_id', validators=[DataRequired()])
    black_id = IntegerField('black_id', validators=[DataRequired()])
    current_board_state = StringField('current_board_state', validators=[DataRequired()])
    moves = StringField(100000)
class UpdateGameForm(FlaskForm):
    white_id = IntegerField('white_id', validators=[DataRequired()])
    black_id = IntegerField('black_id', validators=[DataRequired()])
    current_board_state = StringField('current_board_state', validators=[DataRequired()])
    moves = StringField(100000)
