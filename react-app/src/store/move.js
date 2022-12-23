//Definitions
const SET_START='/move/SET_START'
const SET_END='/move/SET_END'
const SET_PIECE='/move/SET_PIECE'


//Actions
export const setStart = start => ({
    type: SET_START,
    start
})
export const setEnd = end => ({
    type: SET_END,
    end
})
export const setPiece = piece => ({
    type: SET_PIECE,
    piece
})


//Thunks(Middleware)




//Initial State Definition
const initialState = {startPosition:"", endPosition:"", pieceName:""}

//Reducer
export default function moveReducer(state = initialState, action){
    switch(action.type){
        case SET_START:{
            return {...state, startPosition: action.start}
        }
        case SET_END:{
            return {...state, endPosition: action.end}
        }
        case SET_PIECE:{
            return {...state, pieceName: action.piece}
        }
        default: return state
    }
}
