import React from "react";
import NewGame from "./NewGame";
import "./mainPage.css"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function MainPage() {

    const theme = useSelector(state => state.theme.background)
    const history = useHistory()


    return (
        <div className="main-page" data-board={theme} >
            <div className="themed-button-container">
                <div className="themed-title">The world is your oyster!</div>
                <div className="themed-sub-title">What will you do next?</div>
                <NewGame />
                <div className="themed-button" onClick={()=> history.push('/games')}>Games in progress</div>
                <div className="themed-button" onClick={() => history.push('/theme/add')}>Create a new theme</div>
                <div className="themed-button" onClick={() => history.push('/theme/add')}>Edit your themes</div>
            </div>

        </div>
    )
}
