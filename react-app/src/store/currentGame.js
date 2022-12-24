import { openingPosition } from "../components/game/definitions/opening-position";
//Definitions
const CREATE_GAME = '/current_game/CREATE_GAME'

const ADD_POSITION = '/current_game/ADD_POSITION'


//Actions
export const addPosition = position => ({
    type: ADD_POSITION,
    position
})

const createGame = game => ({
    type: CREATE_GAME,
    game
})


//Thunks(Middleware)
export const startNewGame = (game) => async (dispatch) => {
    console.log(game)
    const response = await fetch('api/game/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            white_id: game.white_id,
            black_id: game.black_id,
            current_board_state: openingPosition
        })
    })

    if (response.ok){
        const game = await response.json()
        dispatch(createGame(game))
        return game
    }
    const error = await response.json()
    return error
}



//Initial State Definition
const initialState = {gameId:null, position: openingPosition, whiteUser:null, blackUser:null, moves:[]}

//Reducer
export default function currentGameReducer(state = initialState, action){
    switch(action.type){
        case CREATE_GAME:{
            const newState = {...state, gameId: action.game.id, position: openingPosition, whiteUser:action.game.white_user, blackUser: action.game.black_user}
        }
        case ADD_POSITION:{
            const newState = {...state}
            newState.position = {...state.position, ...action.position}
            return newState
        }
        default: return state
    }
}
