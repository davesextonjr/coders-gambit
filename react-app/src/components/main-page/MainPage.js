import React from "react";
import NewGame from "./NewGame";
import UserGames from "./UserGames";
import "./mainPage.css"

export default function MainPage(){
    return (
        <div className="main-page">
            <NewGame />
            <UserGames />
        </div>
    )
}
