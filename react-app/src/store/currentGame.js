import { openingPosition } from "../components/game/definitions/opening-position";
//Definitions
const ADD_POSITION = '/current_game/ADD_POSITION'


//Actions
export const addPosition = position => ({
    type: ADD_POSITION,
    position
})


//Thunks(Middleware)




//Initial State Definition
const initialState = {position: openingPosition, whiteUser:null, blackUser:null, moves:[]}

//Reducer
export default function currentGameReducer(state = initialState, action){
    switch(action.type){
        case ADD_POSITION:{
            const newState = {...state}
            newState.position = {...state.position, ...action.position}
            return newState
        }
        default: return state
    }
}
