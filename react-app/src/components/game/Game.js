import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import GameBoard from "./GameBoard";
import GamePlay from "./GamePlay";
import { deleteUserGame } from "../../store/userGames";
import UndoMove from "./UndoMove";
import "./Game.css"

export default function Game() {
    const currentGameId = useSelector(state => state.currentGame.gameId)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleDeleteGameClick = e => {
            if (window.confirm("Are you sure you want to delete this game? It will be deleted for both players.")) {
                dispatch(deleteUserGame(currentGameId))
                history.push("/")
            }
    }


    return (
        <div className="background">
            <div className="themed-button-container chess-container">
                <div className="chessboard">
                    <GameBoard />
                    <GamePlay />
                </div>
                <div className="game-button-container">
                    <UndoMove />
                    <button className="themed-button" onClick={handleDeleteGameClick}>DELETE GAME</button>
                </div>
            </div>
        </div>
    )
}
