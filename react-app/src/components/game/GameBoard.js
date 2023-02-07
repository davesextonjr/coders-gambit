import React from "react";
import { useDispatch, useSelector } from "react-redux";

// Using Redux to manage state - "thunks" are used as middleware to make fetch requests and then call the actions
import { setEnd } from "../../store/move";
import { updateGame } from "../../store/currentGame";

// Continuing to grow in using modular code
import { dragOverHandler } from "./helper-functions/DragAndDrop";
import chessboardCreator from "./definitions/chessboard";
import { moveValidation } from "./move-validation/moveValidation";

export default function GameBoard() {
    const dispatch = useDispatch()
    let chessboard = chessboardCreator()

    //TODO: Research if it would be better to use one less useSelctor.
    //I chose to make two variables here from the currentGame slice of state
    const start = useSelector(state => state.move)
    const currentPosition = useSelector(state => state.currentGame.position)
    const currentGame = useSelector(state => state.currentGame)
    const currentFen = useSelector(state => state.currentGame.fen)
    const lightSquares = useSelector(state => state.theme.lightSquares)
    const darkSquares = useSelector(state => state.theme.darkSquares)

    //TODO: Refactor into more modular code.
    // I still have room to grow in passing context.
    const dropHandler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // dispatch(setEnd(e.target.id)) //not currently using this end in moves.

        //create an object to hold the new position and a variable to hold the return fen state
        const newPosition = { ...currentPosition }
        let newFen
        //if the starting square, piece name, and ending square are all known, set the landing square to the piece name, and the leaving square to null.
        //TODO: I am looking forward to thinking through how to define the move logic as I continue to hone my skill as a programmer.
        if (start.startPosition && start.pieceName && e.target.id) {
            // newFen = moveValidation(currentFen, {from: start.startPosition, to: e.target.id})
            // console.log(newFen)
            newPosition[start.startPosition] = null
            newPosition[e.target.id] = start.pieceName
        }

        //This object will be sent to the database to store the move and then the return will be used to update the store.
        //TODO: refactor to make less database calls
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

    chessboard = chessboard.map((square) => {
        let backgroundColor = ""
        const darkOdds = "a c e g"
        if (darkOdds.includes(square[0]) && square[1] % 2 !==0 ||
            !darkOdds.includes(square[0]) && square[1] % 2 ===0
        ){
            backgroundColor = darkSquares
        } else {
            backgroundColor = lightSquares
        }



        return (
            <div
                id={square}
                key={square}
                style={{backgroundColor: backgroundColor}}
                className={`squares ${square}`}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
            >

            </div>
        )
    })


    return (
        <>
            {chessboard}
        </>
    )
}
