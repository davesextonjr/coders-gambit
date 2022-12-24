from app.models import db, Game, environment, SCHEMA


def seed_games():
    #game_one is the game of the century sourced from wikipedia
    game_one = Game(
        white_id=1, black_id=2, moves=""
    )
    #game_two is the cheating game with Magnus Carlsen sourced from chessgames.com
    game_two = Game(
        white_id=1, black_id=3, moves=""
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
