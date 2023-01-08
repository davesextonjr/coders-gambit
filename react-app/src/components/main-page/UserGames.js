import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { loadUserGames } from "../../store/userGames";
import chessboardCreator from "../game/definitions/chessboard";
import positionPlacer from "../game/definitions/postitionplacer";
import { deleteUserGame } from "../../store/userGames";
import NewGame from "./NewGame";

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
    // const blackGames = Object.values(user.user_black_games) add this when multiplayer is enabled

    if (!whiteGames.length) {
        return (
            <div className="themed-button-container">
                <div className="themed-title">You don't have any games currently in progress</div>
                <NewGame />
            </div>
        )
    }

    let chessboard = chessboardCreator() //make the 2d array

    // chessboard = chessboard.map((square, i) => {
    //     return (
    //         <div
    //             id={square}
    //             key={`${square}-${i}`}
    //             className={`squares ${square}`}

    //         />
    //     )
    // })

    return (
        <div className="user-games">
            {whiteGames.map((game, i) => {
                return (
                    <div key={`user-white-game${game.id}`} classname='chessboard-container'>
                        <div className="chessboard" onClick={() => history.push(`/game/${game.id}`)}>
                            {chessboard.map((square) => {
                                return (
                                    <div
                                        id={square}
                                        key={`${square}-${i}`}
                                        className={`squares ${square}`}
                                    />
                                )
                            })}
                            {positionPlacer(game.current_board_state)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
