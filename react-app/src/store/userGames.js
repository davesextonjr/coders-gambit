import { normalize } from "./utilities"

//Definitions
const LOAD = '/USER_GAMES_LOAD'
const DELETE = '/USER_GAMES_DELETE'

//Actions
const loadGames = games => ({
    type: LOAD,
    games
})

const deleteGame = gameId => ({
    type: DELETE,
    gameId
})


//Thunks(Middleware)
export const loadUserGames = () => async dispatch => {
    const response = await fetch(`/api/game`)
    if (response.ok) {
        const games = await response.json()
        dispatch(loadGames(games))
        return games
    }
    const error = await response.json()
    return error
}

export const deleteUserGame = gameId => async dispatch => {
    const response = await fetch(`/api/game/${gameId}`, {
        method: 'DELETE'
    })
    if(response.ok) {
        dispatch(deleteGame(gameId))
    }
    return response.json()
}



//Initial State Definition
const initialState = []

//Reducer
export default function userGamesReducer (state = initialState, action){
    switch(action.type){
        case LOAD: {
            return action.games
        }
        case DELETE:{
            let newState = [...state]
            const allGames = normalize(newState)
            delete allGames[action.gameId]
            newState = Object.values(allGames)
            return newState
        }
        default: return state
    }
}
