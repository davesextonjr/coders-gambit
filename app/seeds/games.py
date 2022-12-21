from app.models import db, Game, environment, SCHEMA


def seed_games():
    #game_one is the game of the century sourced from wikipedia
    game_one = Game(
        white_id=1, black_id=2, moves="1. Nf3 Nf6 2. c4 g6 3. Nc3 Bg7 4. d4 O-O 5. Bf4 d5 6. Qb3 dxc4 7. Qxc4 c6 8. e4 Nbd7 9. Rd1 Nb6 10. Qc5 Bg4 11. Bg5 Na4 12. Qa3 Nxc3 13. bxc3 Nxe4 14. Bxe7 Qb6 15. Bc4 Nxc3 16. Bc5 Rfe8+ 17. Kf1 Be6 18. Bxb6 Bxc4+ 19. Kg1 Ne2+ 20. Kf1 Nxd4+ 21. Kg1 Ne2+ 22. Kf1 Nc3+ 23. Kg1 axb6 24. Qb4 Ra4 25. Qxb6 Nxd1 26. h3 Rxa2 27. Kh2 Nxf2 28. Re1 Rxe1 29. Qd8+ Bf8 30. Nxe1 Bd5 31. Nf3 Ne4 32. Qb8 b5 33. h4 h5 34. Ne5 Kg7 35. Kg1 Bc5+ 36. Kf1 Ng3+ 37. Ke1 Bb4+ 38. Kd1 Bb3+ 39. Kc1 Ne2+ 40. Kb1 Nc3+ 41. Kc1 Rc2# 0-1"
    )
    #game_two is the cheating game with Magnus Carlsen sourced from chessgames.com
    game_two = Game(
        white_id=1, black_id=3, moves="1. d4 Nf6 2. c4 e6 3. Nc3 Bb4 4. g3 O-O 5. Bg2 d5 6. a3 Bxc3+ 7. bxc3 dxc4 8. Nf3 c5 9. O-O cxd4 10. Qxd4 Nc6 11. Qxc4 e5 12. Bg5 h6 13. Rfd1 Be6 14. Rxd8 Bxc4 15. Rxa8 Rxa8 16. Bxf6 gxf6 17. Kf1 Rd8 18. Ke1 Na5 19. Rd1 Rc8 20. Nd2 Be6 21. c4 Bxc4 22. Nxc4 Rxc4 23. Rd8+ Kg7 24. Bd5 Rc7 25. Ra8 a6 26. Rb8 f5 27. Re8 e4 28. g4 Rc5 29. Ba2 Nc4 30. a4 Nd6 31. Re7 fxg4 32. Rd7 e3 33. fxe3 Ne4 34. Kf1 Rc1+ 35. Kg2 Rc2 36. Bxf7 Rxe2+ 37. Kg1 Re1+ 38. Kg2 Re2+ 39. Kg1 Kf6 40. Bd5 Rd2 41. Rf7+ Kg6 42. Rd7 Ng5 43. Bf7+ Kf5 44. Rxd2 Nf3+ 45. Kg2 Nxd2 46. a5 Ke5 47. Kg3 Nf1+ 48. Kf2 Nxh2 49. e4 Kxe4 50. Be6 Kf4 51. Bc8 Nf3 52. Bxb7 Ne5 53. Bxa6 Nc6 54. Bb7 Nxa5 55. Bd5 h5 56. Bf7 h4 57. Bd5 Ke5 0-1"
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
