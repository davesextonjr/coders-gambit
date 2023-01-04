from app.models import db, Game, environment, SCHEMA


def seed_games():
    #game_one is the game of the century sourced from wikipedia
    game_one = Game(
        white_id=1, black_id=2, moves="", current_board_state="{\"a8\":\"bR\",\"b8\":\"bKn\",\"c8\":\"bB\",\"d8\":\"bQ\",\"e8\":\"bK\",\"f8\":\"bB\",\"g8\":\"bKn\",\"h8\":\"bR\",\"a7\":\"b\",\"b7\":\"b\",\"c7\":\"b\",\"d7\":\"b\",\"e7\":\"b\",\"f7\":\"b\",\"g7\":\"b\",\"h7\":\"b\",\"a6\":null,\"b6\":null,\"c6\":null,\"d6\":null,\"e6\":null,\"f6\":null,\"g6\":null,\"h6\":null,\"a5\":null,\"b5\":null,\"c5\":null,\"d5\":null,\"e5\":null,\"f5\":null,\"g5\":null,\"h5\":null,\"a4\":null,\"b4\":null,\"c4\":null,\"d4\":null,\"e4\":null,\"f4\":null,\"g4\":null,\"h4\":null,\"a3\":null,\"b3\":null,\"c3\":\"w\",\"d3\":null,\"e3\":null,\"f3\":null,\"g3\":null,\"h3\":null,\"a2\":\"w\",\"b2\":\"w\",\"c2\":null,\"d2\":\"w\",\"e2\":\"w\",\"f2\":\"w\",\"g2\":\"w\",\"h2\":\"w\",\"a1\":\"wR\",\"b1\":\"wKn\",\"c1\":\"wB\",\"d1\":\"wQ\",\"e1\":\"wK\",\"f1\":\"wB\",\"g1\":\"wKn\",\"h1\":\"wR\"}"
    )
    #game_two is the cheating game with Magnus Carlsen sourced from chessgames.com
    game_two = Game(
        white_id=1, black_id=3, moves="", current_board_state="{\"a8\":\"bR\",\"b8\":\"bKn\",\"c8\":\"bB\",\"d8\":\"bQ\",\"e8\":\"bK\",\"f8\":\"bB\",\"g8\":\"bKn\",\"h8\":\"bR\",\"a7\":\"b\",\"b7\":\"b\",\"c7\":\"b\",\"d7\":\"b\",\"e7\":\"b\",\"f7\":\"b\",\"g7\":\"b\",\"h7\":\"b\",\"a6\":null,\"b6\":null,\"c6\":null,\"d6\":null,\"e6\":null,\"f6\":null,\"g6\":null,\"h6\":null,\"a5\":null,\"b5\":null,\"c5\":null,\"d5\":null,\"e5\":null,\"f5\":null,\"g5\":null,\"h5\":null,\"a4\":null,\"b4\":null,\"c4\":null,\"d4\":null,\"e4\":null,\"f4\":null,\"g4\":null,\"h4\":null,\"a3\":null,\"b3\":null,\"c3\":\"w\",\"d3\":null,\"e3\":null,\"f3\":null,\"g3\":null,\"h3\":null,\"a2\":\"w\",\"b2\":\"w\",\"c2\":null,\"d2\":\"w\",\"e2\":\"w\",\"f2\":\"w\",\"g2\":\"w\",\"h2\":\"w\",\"a1\":\"wR\",\"b1\":\"wKn\",\"c1\":\"wB\",\"d1\":\"wQ\",\"e1\":\"wK\",\"f1\":\"wB\",\"g1\":\"wKn\",\"h1\":\"wR\"}"
    )

    db.session.add(game_one)
    db.session.add(game_two)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.


def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM games")

    db.session.commit()
