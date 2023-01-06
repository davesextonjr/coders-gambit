//Definitions
const SET_THEME='/theme/SET_THEME'


//Actions
export const setTheme = ({background, url, theme_name, light_squares, dark_squares, piece_name}) => ({
    type: SET_THEME,
    background,
    url,
    theme_name,
    light_squares,
    dark_squares,
    piece_name,
})


//Thunks(Middleware)
export const addTheme = theme => async dispatch => {
    const jason = JSON.stringify({
        user_id: theme.userId,
        theme_name: theme.themeName,
        background: theme.background,
        light_squares: theme.lightSquares,
        dark_squares: theme.darkSquares,
        piece_name: theme.pieceName,
        url: theme.url
    })

    console.log(jason)

    const response = await fetch('/api/theme/new', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: theme.userId,
            theme_name: theme.themeName,
            background: theme.background,
            light_squares: theme.lightSquares,
            dark_squares: theme.darkSquares,
            piece_name: theme.pieceName,
            url: theme.url
        })
    })

    if (response.ok){
        const theme = await response.json()
        dispatch(setTheme(theme))
        return theme
    }
    const error = await response.json()
    return error
}



//Initial State Definition
const initialState = {background: "dark", url:"", themeName:"", lightSquares:"", darkSquares:"", pieceName:""}

//Reducer
export default function themeReducer(state = initialState, action){
    switch(action.type){
        case SET_THEME:{
            return {...state,
                background: action.background,
                url: action.url,
                themeName: action.theme_name,
                lightSquares: action.light_squares,
                darkSquares: action.dark_squares,
                pieceName: action.piece_name
            }
        }

        default: return state
    }
}
