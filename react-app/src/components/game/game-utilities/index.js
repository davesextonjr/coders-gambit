import {startNewGame} from "../../../store/currentGame"
import {openingPosition} from "../../game/definitions/opening-position"

export async function createNewGame(white_id, black_id){
    const moves = [];
    const newGame = await dispatch(startNewGame({
        white_id,
        black_id,
        current_board_state: JSON.stringify(openingPosition),
        moves: JSON.stringify(moves)
    }))
    console.log( "the new Game", newGame)
    if (newGame.id){
        history.push(`/game/${newGame.id}`)
    }
}