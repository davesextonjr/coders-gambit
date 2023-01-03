//Definitions
const LOAD = '/USER_GAMES_LOAD'

//Actions
const loadGames = games => ({
    type: LOAD,
    games
})


//Thunks(Middleware)
export const loadUserGames = () => async dispatch => {
    const response = await fetch(`/api/game`)
    if (response.ok) {
        const games = await response.json()
        dispatch(loadGames)
        return games
    }
    const error = await response.json()
    return error
}



//Initial State Definition
const initialState = []

//Reducer
export default function userGamesReducer (state = initialState, action){
    switch(action.type){
        case LOAD: {
            return action.games
        }
        default: return state
    }
}
