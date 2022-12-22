import React, { useState } from "react";
import { openingPosition } from "./definitions/opening-position";
import './game.css'


export default function GamePlay(){
    // const [gameState, setGameState] =
    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.target)
    }

    const gameState = []
    for (const square in openingPosition){
        if(openingPosition[square]){
            gameState.push(<div key={square} id={square} className={square} onDrop={dropHandler}>
                {openingPosition[square]}
            </div>)
        }
    }
    return (
        <>
            {gameState}
        </>

    )
}
