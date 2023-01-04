import React from "react";
import NewGame from "./NewGame";
import UserGames from "./UserGames";
import "./mainPage.css"

export default function MainPage(){
    let theme = "dark"

    return (
        <div className="main-page" data-board={theme}>
            <NewGame />
            <UserGames />
        </div>
    )
}
