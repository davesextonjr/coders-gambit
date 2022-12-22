import { openingPosition } from "../components/game/definitions/opening-position";
//Definitions



//Actions



//Thunks(Middleware)




//Initial State Definition
const initialState = {gameBoard: {0: openingPosition}, whiteUser:null, blackUser:null, moves:[]}

//Reducer
export default function currentGameReducer(state = initialState, action){
    switch(action.type){
        default: return state
    }
}
