//Definitions
const SET_THEME='/theme/SET_THEME'


//Actions
export const setTheme = ({background, url}) => ({
    type: SET_THEME,
    background,
    url
})


//Thunks(Middleware)




//Initial State Definition
const initialState = {background: "dark", url:""}

//Reducer
export default function themeReducer(state = initialState, action){
    switch(action.type){
        case SET_THEME:{
            return {...state, background: action.background, url: action.url}
        }

        default: return state
    }
}
