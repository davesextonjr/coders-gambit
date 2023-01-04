import React from "react";
import NewGame from "./NewGame";
import UserGames from "./UserGames";
import "./mainPage.css"
import { useSelector } from "react-redux";

export default function MainPage(){

    const theme = useSelector(state => state.theme.background)

    return (
        <div className="main-page" data-board={theme}>
            <NewGame />
            <UserGames />
        </div>
    )
}
