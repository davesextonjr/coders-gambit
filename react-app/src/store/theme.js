//Definitions
const SET_BACKGROUND='/theme/SET_BACKGROUND'


//Actions
export const setBackground = label => ({
    type: SET_BACKGROUND,
    label
})


//Thunks(Middleware)




//Initial State Definition
const initialState = {background: "dark"}

//Reducer
export default function themeReducer(state = initialState, action){
    switch(action.type){
        case SET_BACKGROUND:{
            return {...state, background: action.label}
        }

        default: return state
    }
}
