import { setTheme } from "./theme"

//Definitions
const LOAD = '/user_theme/LOAD'

const UPDATE_THEME = "/user_theme/UPDATE_THEME"

//Actions
const loadThemes = themes => ({
    type: LOAD,
    themes
})

const updateTheme = theme => ({
    type: UPDATE_THEME,
    theme
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

export const updateThemeById = theme => async dispatch => {
    const response = await fetch(`/api/theme/update`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'id': theme.themeId,
            'user_id': theme.userId,
            'theme_name': theme.themeName,
            'background': theme.background,
            'light_squares': theme.lightSquares,
            'dark_squares': theme.darkSquares,
            'piece_name': theme.pieceName,
            'url': theme.url
        })
    })
    if (response.ok){
        const theme = await response.json()
        dispatch(updateTheme(theme))
        dispatch(setTheme(theme))
        return theme
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
        case UPDATE_THEME: {
            const newState = {...state}
            newState[action.theme.id] = action.theme
        }
        default: return state
    }
}
