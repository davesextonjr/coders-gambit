import {startNewGame} from "../../../store/currentGame"
import {openingPosition} from "../../game/definitions/opening-position"

export async function CreateNewGame({white_id, black_id, history, dispatch}){
    const moves = [];
    const newGame = await dispatch(startNewGame({
        white_id,
        black_id,
        current_board_state: JSON.stringify(openingPosition),
        moves: JSON.stringify(moves),
        fen:"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    }))
    console.log( "the new Game", newGame)
    if (newGame.id){
        history.push(`/game/${newGame.id}`)
    }
}
