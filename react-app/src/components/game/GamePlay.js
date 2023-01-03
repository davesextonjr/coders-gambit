import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { openingPosition } from "./definitions/opening-position";
import { pieces } from "./definitions/pieces";
import { setPiece, setStart } from "../../store/move";

import { useDispatch, useSelector } from 'react-redux';

import './game.css'
import { addPosition, getGameById } from "../../store/currentGame";


export default function GamePlay() {
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
          await dispatch(getGameById(id));
          setLoaded(true);
        })();
      }, [dispatch, id]);
    const currentPosition = useSelector(state => state.currentGame.position)
    if (!loaded) {
        // dispatch(addPosition(openingPosition, []))
        console.log('I was here for a sec')
        return (
            <h1>waiting for a position</h1>
        )
    }

    console.log(currentPosition, "THIS IS THE CURRENT POSITION")
    const dragStartHandler = (e) => {
        e.stopPropagation()
        dispatch(setStart(e.target.id))
        dispatch(setPiece(e.target.name))
        // console.log(e.target.id, e.target.name)
    }

    const gameState = []
    for (const square in currentPosition){
        const piece = currentPosition[square]
        if(piece){
            gameState.push(<img src={pieces[piece].image} key={square} name={piece} id={square} className={square} draggable={true} onDragStart={dragStartHandler}/>)
        }
    }


    return (
        <>
            {gameState }
            {/* <h1>TESTING</h1> */}
        </>

    )
}
