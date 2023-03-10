import React, { useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import { pieces } from "./definitions/pieces";
import { setPiece, setStart } from "../../store/move";

import { useDispatch, useSelector } from 'react-redux';
import { getGameById, updateGame } from "../../store/currentGame";

import { moveValidation } from "./move-validation/moveValidation";


export default function GamePlay() {
    const [loaded, setLoaded] = useState(false)
    const [begin, setBegin] = useState("")
    let isGameOver = false
    let winner = ""
    const [beginPiece, setBeginPiece] = useState("")
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            await dispatch(getGameById(id));
            setLoaded(true);
        })();
    }, [dispatch, id]);
    const currentGame = useSelector(state => state.currentGame)
    const currentPosition = useSelector(state => state.currentGame.position)
    const currentFen = useSelector(state => state.currentGame.fen)
    if (!loaded) {
        return (
            <h1>waiting for a position</h1>
        )
    }
    const dragOverHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const dragStartHandler = (e) => {
        e.stopPropagation()
        dispatch(setStart(e.target.id))
        dispatch(setPiece(e.target.name))
        setBegin(e.target.id)
        setBeginPiece(e.target.name)
    }
    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // dispatch(setEnd(e.target.id)) // currently not using this
        const newPosition = { ...currentPosition }
        // let newFen
        if (begin && beginPiece && e.target.id) {
            //newFen = moveValidation(currentFen, {from: begin, to: e.target.id})
            newPosition[begin] = null
            newPosition[e.target.id] = beginPiece
        }
        const game = {
            id: currentGame.gameId,
            white_id: currentGame.whiteUser,
            black_id: currentGame.blackUser,
            moves: JSON.stringify([...currentGame.moves, currentPosition]),
            current_board_state: JSON.stringify(newPosition),
            fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        }

        dispatch(updateGame(game))

    }
    if (! Object.values(currentPosition).includes("bK") || ! Object.values(currentPosition).includes("wK")) {
        winner = Object.values(currentPosition).includes("bK") ? 'Black' : 'White'
        isGameOver = true
    }


    const gameState = []
    for (const square in currentPosition) {
        const piece = currentPosition[square]
        if (piece) {
            gameState.push(<img
                src={pieces[piece].image}
                key={square}
                name={piece}
                id={square}
                className={square}
                draggable={true}
                onDragStart={dragStartHandler}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
            />)
        }
    }





    return (
        <>
            {isGameOver && <div className="winner">{winner} wins!</div>}
            {gameState}
        </>

    )
}
