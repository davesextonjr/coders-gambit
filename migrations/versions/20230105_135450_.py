"""empty message

Revision ID: 391c75edc238
Revises:
Create Date: 2023-01-05 13:54:50.758325

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '391c75edc238'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


    op.create_table('games',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('white_id', sa.Integer(), nullable=False),
    sa.Column('black_id', sa.Integer(), nullable=False),
    sa.Column('moves', sa.String(length=5000), nullable=True),
    sa.Column('current_board_state', sa.String(length=5000), nullable=True),
    sa.ForeignKeyConstraint(['black_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['white_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE games SET SCHEMA {SCHEMA};")


    op.create_table('themes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('theme_name', sa.String(length=25), nullable=False),
    sa.Column('background', sa.String(length=25), nullable=False),
    sa.Column('light_squares', sa.String(length=25), nullable=False),
    sa.Column('dark_squares', sa.String(length=25), nullable=False),
    sa.Column('piece_name', sa.String(length=25), nullable=False),
    sa.Column('url', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE themes SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('themes')
    op.drop_table('games')
    op.drop_table('users')
    # ### end Alembic commands ###