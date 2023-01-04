// import { openingPosition } from "../components/game/definitions/opening-position";
//Definitions
const CREATE_GAME = '/current_game/CREATE_GAME'

const ADD_POSITION = '/current_game/ADD_POSITION'

const SET_GAME_BY_ID = '/current_game/SET_GAME_BY_ID'



//Actions
const createGame = (game, position) => ({
    type: CREATE_GAME,
    game,
    position
})

export const addPosition = (position, moves) => ({
    type: ADD_POSITION,
    position,
    moves
})

const setGameById = (game, position, moves) => ({
    type: SET_GAME_BY_ID,
    game,
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
            black_id: game.black_id,
            current_board_state: game.current_board_state,
            moves: game.moves
        })
    })

    if (response.ok){
        const game = await response.json()
        const position = JSON.parse(game.current_board_state)
        dispatch(createGame(game, position))
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

export const getGameById = id => async (dispatch) => {
    const response = await fetch(`/api/game/${id}`)
    if (response.ok) {
        const game = await response.json()
        const position = JSON.parse(game.current_board_state)
        const moves = JSON.parse(game.moves)
        console.log("!!!!!!!!!!!!!!!!!!!!!!", game, position, moves)
        dispatch(setGameById(game, position, moves))
        return {game, position, moves}
    }
    const error = await response.json()
    return error
}



//Initial State Definition
const initialState = {position: null, whiteUser:null, blackUser:null, moves:[], gameId: null}

//Reducer
export default function currentGameReducer(state = initialState, action){
    switch(action.type){
        case CREATE_GAME:{
            const newState = {...state, gameId: action.game.id, position: action.position, whiteUser:action.game.white_id, blackUser: action.game.black_id}
            return newState
        }
        case ADD_POSITION:{
            const newState = {...state}
            newState.position = {...state.position, ...action.position}
            newState.moves = [...state.moves, ...action.moves]
            return newState
        }
        case SET_GAME_BY_ID:{
            const newState = {...state}
            newState.gameId = action.game.id
            newState.whiteUser = action.game.white_id
            newState.blackUser = action.game.black_id
            newState.position = {...action.position}
            newState.moves = [...state.moves, action.moves]
            return newState
        }
        default: return state
    }
}
