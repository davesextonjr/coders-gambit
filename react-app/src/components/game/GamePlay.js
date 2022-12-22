import React, { useState } from "react";
import { openingPosition } from "./definitions/opening-position";
import './game.css'


export default function GamePlay(){
    // const [gameState, setGameState] =
    const clickHandler = (e) => {
        e.stopPropagation()
        console.log(e.target)
    }

    const gameState = []
    for (const square in openingPosition){
        if(openingPosition[square]){
            gameState.push(<div key={square} id={square} className={square}>
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
