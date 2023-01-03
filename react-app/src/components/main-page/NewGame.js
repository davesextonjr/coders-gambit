import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { startNewGame } from "../../store/currentGame";

export default function NewGame(){
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    const clickHandler = async (e) => {


        const newGame = await dispatch(startNewGame({white_id: currentUser.id, black_id: currentUser.id}))
        console.log( "the new Game", newGame)
        if (newGame.id){
            history.push(`/game/${newGame.id}`)
        }
    }

    return(
        <div className="add-game-container">

            <div className="start-new-game" onClick={clickHandler}>
                Start a New Game
            </div>

        </div>
    )
}
