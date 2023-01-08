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
    const lightSquares = useSelector(state => state.theme.lightSquares)
    const darkSquares = useSelector(state => state.theme.darkSquares)
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

    chessboard = chessboard.map((square) => {
        let backgroundColor = ""
        const darkOdds = "a c e g"
        if (darkOdds.includes(square[0]) && square[1] % 2 !==0 ||
            !darkOdds.includes(square[0]) && square[1] % 2 ===0
        ){
            backgroundColor = darkSquares
        } else {
            backgroundColor = lightSquares
        }

        return (
            <div
                id={square}
                key={`${square}`}
                className={`squares ${square}`}
                style={{backgroundColor: backgroundColor}}
            />
        )
    })

    return (
        <div className="themed-button-container user-games-outer-container">
            <div className="themed-title">Your Current Games</div>
            <div className="themed-sub-title">Click on a game to continue playing or to delete the game.</div>
            <div className="user-games-container">
                {whiteGames.map((game) => {
                    return (

                            <div key={`user-white-game${game.id}`} className="chessboard" onClick={() => history.push(`/game/${game.id}`)}>
                                {chessboard}
                                {positionPlacer(game.current_board_state)}
                            </div>

                    )
                })}
            </div>
        </div>
    )
}
