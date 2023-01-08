import React from "react";
import GameBoard from "./GameBoard";
import GamePlay from "./GamePlay";
import "./Game.css"
import UndoMove from "./UndoMove";
import { useSelector } from "react-redux";

export default function Game() {
    const currentGame = useSelector(state => state.currentGame.gameId)
    console.log(currentGame)
    return (
        <div className="background">
            <div className="themed-button-container chess-container">
                <div className="chessboard">
                    <GameBoard />
                    <GamePlay />
                </div>
                <div className="game-button-container">
                    <UndoMove />
                    <button className="themed-button">DELETE GAME</button>
                </div>
            </div>
        </div>
    )
}
