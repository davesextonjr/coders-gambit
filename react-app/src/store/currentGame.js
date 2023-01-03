import { openingPosition } from "../components/game/definitions/opening-position";
//Definitions
const CREATE_GAME = '/current_game/CREATE_GAME'

const ADD_POSITION = '/current_game/ADD_POSITION'



//Actions
const createGame = game => ({
    type: CREATE_GAME,
    game
})

export const addPosition = (position, moves) => ({
    type: ADD_POSITION,
    position,
    moves
})


//Thunks(Middleware)
export const startNewGame = (game) => async (dispatch) => {
    console.log(game)
    const response = await fetch('/api/game/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            white_id: game.white_id,
            black_id: game.black_id
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

export const updateGame = game => async (dispatch) => {
    const response = await fetch('/api/game/update',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: game.id,
            white_id: game.white_id,
            black_id: game.black_id,
            moves: game.moves,
            current_board_state: game.current_board_state
        })
    })

    if (response.ok){
        const game = await response.json()
        // console.log(JSON.parse(game.current_board_state), JSON.parse(game.moves))
        const position = JSON.parse(game.current_board_state)
        const moves = JSON.parse(game.moves)
        dispatch(addPosition(position, moves))
        return game
    }
    const error = await response.json()
    return error
}





//Initial State Definition
const initialState = {position: openingPosition, whiteUser:null, blackUser:null, moves:[]}

//Reducer
export default function currentGameReducer(state = initialState, action){
    switch(action.type){
        case CREATE_GAME:{
            const newState = {...state, gameId: action.game.id, position: openingPosition, whiteUser:action.game.white_id, blackUser: action.game.black_id}
            return newState
        }
        case ADD_POSITION:{
            const newState = {...state}
            newState.position = {...state.position, ...action.position}
            newState.moves = [...state.moves, ...action.moves]
            return newState
        }
        default: return state
    }
}
