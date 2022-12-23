import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GamePlay from "./GamePlay";
import { dragOverHandler } from "./helper-functions/DragAndDrop";
import './game.css'
import { setEnd } from "../../store/move";
import { addPosition } from "../../store/currentGame";
import { openingPosition } from "./definitions/opening-position";

export default function GameBoard() {

    const dispatch = useDispatch()
    const start = useSelector(state => state.move)
    const currentPosition = useSelector(state => state.currentGame.positions)
    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(setEnd(e.target.id))
        // console.log("start in drop", start.startPosition, start.pieceName)
        // console.log(e.target.id)
        // console.log(currentPosition)
        // const newPosition = {...currentPosition}

        // dispatch(addPosition())

    }


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
                    return (
                        <div
                            id={square}
                            key={square}
                            className={`squares ${square}`}
                            onDragOver={dragOverHandler}
                            onDrop={dropHandler}
                        >{square}
                        </div>
                    )
                })
                }
                <GamePlay />
            </div>
        </div>
    )
}
