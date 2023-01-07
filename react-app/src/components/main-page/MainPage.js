import React from "react";
import NewGame from "./NewGame";
import UserGames from "./UserGames";
import "./mainPage.css"
import { useSelector } from "react-redux";

export default function MainPage() {
    // style={{backgroundImage: `url(https://lichess1.org/assets/images/background/landscape.jpg)`}}
    const theme = useSelector(state => state.theme.background)
    const userGames = useSelector(state => state.userGames)

    return (
        <div className="main-page" data-board={theme} >
            <div className="themed-button-container">
                <div className="themed-title">The world is your oyster!</div>
                <div className="themed-sub-title">Where will you begin?</div>
                <NewGame />
                <div className="themed-button">Games in progress</div>
                <div className="themed-button">Create a new theme</div>
                <div className="themed-button">Edit your themes</div>
            </div>

        </div>
    )
}
