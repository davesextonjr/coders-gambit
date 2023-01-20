import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CreateNewGame } from "../game/game-utilities";

export default function NewGame(){
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    const newGameInfo = {
        white_id: currentUser.id,
        black_id: currentUser.id,
        history,
        dispatch
    }

    return(
        <>
            <div className="start-new-game themed-button" onClick={() => CreateNewGame(newGameInfo)}>
                Start a New Game
            </div>
        </>


    )
}
