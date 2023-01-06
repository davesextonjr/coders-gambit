//Definitions
const LOAD = '/USER_THEME_LOAD'

//Actions
const loadThemes = themes => ({
    type: LOAD,
    themes
})


//Thunks(Middleware)
export const loadUserThemes = () => async dispatch => {
    const response = await fetch(`/api/theme`)
    if (response.ok) {
        const themes = await response.json()
        dispatch(loadThemes(themes))
        return themes
    }
    const error = await response.json()
    return error
}



//Initial State Definition
const initialState = []

//Reducer
export default function userThemesReducer (state = initialState, action){
    switch(action.type){
        case LOAD: {
            return action.themes
        }
        default: return state
    }
}
