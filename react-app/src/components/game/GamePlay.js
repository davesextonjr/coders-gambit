import React, { useState } from "react";
import { openingPosition } from "./definitions/opening-position";
import { pieces } from "./definitions/pieces";
import { setPiece, setStart } from "../../store/move";

import { useDispatch, useSelector } from 'react-redux'

import './game.css'


export default function GamePlay(){
    //  const [takeOff, setTakeOff] = useState("")
    const dispatch = useDispatch()
    const currentPosition = useSelector(state => state.currentGame.position)
    // console.log(currentPosition)

        const dragStartHandler = (e) => {
        e.stopPropagation()
        dispatch(setStart(e.target.id))
        dispatch(setPiece(e.target.name))
        console.log(e.target.id, e.target.name)
    }

    const gameState = []
    // "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
    for (let char of currentPosition){
        const piece = currentPosition[square]
        if(piece){
            gameState.push(<img src={pieces[piece].image} key={square} name={piece} id={square} className={square} draggable={true} onDragStart={dragStartHandler}/>)
        }
    }


    return (
        <>
            {gameState }
        </>

    )
}
