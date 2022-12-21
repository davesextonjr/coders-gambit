import React from "react";

import GamePlay from "./GamePlay";
import './game.css'

export default function GameBoard() {
    const rowNumber = ["8", "7", "6", "5", "4", "3", "2", "1"]
    const columnLetter = ["a", "b", "c", "d", "e", "f", "g", "h"]
    const chessboard = []

    for (let i = 0; i < rowNumber.length; i++) {
        for (let j = 0; j < columnLetter.length; j++) {
            chessboard.push(`${columnLetter[j]}${rowNumber[i]}`)
        }
    }



    return (
        <div className="background">
            <div>{chessboard.join(", ")}</div>
            <div className="chessboard">
                {chessboard.map((square) => {
                       return(
                       <div id={square} key={square} className={`squares ${square}`}>{square}</div>
                       )
                })
                }
                <GamePlay />
            </div>
        </div>
    )
}
