import { pieces } from "./pieces"


export default function positionPlacer(stringPosition){
    const gameState = []
    const position = JSON.parse(stringPosition)
    console.log(position)
    for (const square in position){
        const piece = position[square]
        if(piece){
            gameState.push(<img src={pieces[piece].image} key={square} name={piece} id={square} className={square}/>)
        }
    }
    return gameState
}
