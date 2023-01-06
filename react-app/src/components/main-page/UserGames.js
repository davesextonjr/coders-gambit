import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadUserGames } from "../../store/userGames";
import chessboardCreator from "../game/definitions/chessboard";
import positionPlacer from "../game/definitions/postitionplacer";
import { deleteUserGame } from "../../store/userGames";

export default function UserGames() {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const history = useHistory()
    const userGames = useSelector(state => state.userGames.user_white_games)
    useEffect(() => {
        dispatch(loadUserGames()).then(user => setUser(user)).then(() =>
            setLoaded(true)
        )
    }, [dispatch]);
    if (!loaded) {
        return (
            <h1>waiting for user</h1>
        )
    }
    const whiteGames = Object.values(user.user_white_games)
    const blackGames = Object.values(user.user_black_games)
    console.log(blackGames)

    let chessboard = chessboardCreator() //make the 2d array

    chessboard = chessboard.map((square) => {
        return (
            <div
                id={square}
                key={square}
                className={`squares ${square}`}

            />
        )
    })

    return (
        <div className="user-games">
            {whiteGames.map(game => {
                return (
                    <div classname='chessboard-container'>
                        <div className="chessboard" onClick={() => history.push(`/game/${game.id}`)}>
                            {chessboard}
                            {positionPlacer(game.current_board_state)}
                        </div>
                        <div className="button-container">
                            <button onClick={() => history.push(`/game/${game.id}`)}>Continue Game</button>
                            <button userGames={userGames} onClick={() => {
                                if (window.confirm("Are you sure you want to delete this game? It will be deleted for both players.")) {
                                    dispatch(deleteUserGame(game.id))
                                }
                            }

                            }>Delete Game</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
