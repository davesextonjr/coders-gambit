
import {Chess} from 'chess.js'

export function moveValidation (fen="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1", move=""){
    const chess = new Chess(fen)
        console.log(chess.board())
    if(move) {
        try {
            chess.move(move)
        } catch (error) {
            return alert(error)
        }
    }
    if(chess.isGameOver()) return "Great Game!"
    console.log("state after move", chess.fen())
    return chess.fen()
}
