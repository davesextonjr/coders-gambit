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
const initialState = {positions: {0: openingPosition}, whiteUser:null, blackUser:null, moves:[]}

//Reducer
export default function currentGameReducer(state = initialState, action){
    switch(action.type){
        case ADD_POSITION:{
            const newState = {...state}
            newState.positions = {...state.positions, ...action.position}
            return newState
        }
        default: return state
    }
}
