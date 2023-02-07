import { useSelector } from "react-redux"
import chessboardCreator from "../game/definitions/chessboard"
import { openingPosition } from "../game/definitions/opening-position"
import positionPlacer from "../game/definitions/postitionplacer"

export function DisplayBoard() {
    const lightSquares = useSelector(state => state.theme.lightSquares)
    const darkSquares = useSelector(state => state.theme.darkSquares)
    const position = JSON.stringify(openingPosition)

    // Create the ChessBoard
    let chessboard = chessboardCreator()

    chessboard = chessboard.map((square) => {
        let backgroundColor = ""
        const darkOdds = "a c e g"
        if (darkOdds.includes(square[0]) && square[1] % 2 !== 0 ||
            !darkOdds.includes(square[0]) && square[1] % 2 === 0
        ) {
            backgroundColor = darkSquares
        } else {
            backgroundColor = lightSquares
        }

        return (
            <div
                id={square}
                key={`${square}`}
                className={`squares ${square}`}
                style={{ backgroundColor: backgroundColor }}
            />
        )
    })


    return (
        <div className="chessboard">
            {chessboard}
            {positionPlacer(position)}
        </div>
    )



}
