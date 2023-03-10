from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, URLField
from wtforms.validators import DataRequired, Length, URL

class AddEditThemeForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired(message='Must be a logged in user')])
    theme_name = StringField('theme_name', validators=[DataRequired(message="Please provide a theme name"), Length(min=3, max=25, message="Must be between 3 and 25 characters")])
    background = StringField('background', validators=[DataRequired(message="Please choose a background theme"), Length(min=3, max=25, message="Must be between 3 and 25 characters")])
    light_squares = StringField('light_squares', validators=[DataRequired(message="Please choose a light square color"), Length(min=3, max=25, message="Must be between 3 and 25 characters")])
    dark_squares = StringField('dark_squares', validators=[DataRequired(message="Please choose a dark square color"), Length(min=3, max=25, message="Must be between 3 and 25 characters")])
    piece_name = StringField('dark_squares', validators=[DataRequired(message="Please provide a piece name"), Length(min=3, max=25, message="Must be between 3 and 25 characters")])
    url = URLField('url')
