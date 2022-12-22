import React, { useState } from "react";
import { openingPosition } from "./definitions/opening-position";
import { pieces } from "./definitions/pieces";
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
        const piece = openingPosition[square]
        if(piece){
            gameState.push(<img src={pieces[piece].image} key={square} id={square} className={square} draggable={true}/>)
        }
    }
    return (
        <>
            {gameState}
        </>

    )
}
