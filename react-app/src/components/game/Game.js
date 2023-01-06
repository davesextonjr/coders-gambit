import React from "react";
import GameBoard from "./GameBoard";
import GamePlay from "./GamePlay";
import "./Game.css"
import UndoMove from "./UndoMove";

export default function Game(){

    return(
        <div className="background">
            <div className="chessboard">
                <GameBoard />
                <GamePlay />
            </div>
            <UndoMove />
        </div>
    )
}
