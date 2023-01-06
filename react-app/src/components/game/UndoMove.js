import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateGame } from "../../store/currentGame";



export default function UndoMove() {
    const dispatch = useDispatch()
    const currentGame = useSelector(state => state.currentGame)

    const clickHandler = () => {
        const lastMove = currentGame.moves.pop()

        const game = {
            id: currentGame.gameId,
            white_id: currentGame.whiteUser,
            black_id: currentGame.blackUser,
            moves: JSON.stringify([...currentGame.moves]),
            current_board_state: JSON.stringify(lastMove)
        }
        console.log(game)
        dispatch(updateGame(game))

    }
    return (
        <button disabled={!currentGame.moves.length} onClick={clickHandler}>
            UNDO MOVE
        </button>
    )
}
