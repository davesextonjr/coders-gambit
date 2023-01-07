import React from "react";
import NewGame from "./NewGame";
import UserGames from "./UserGames";
import "./mainPage.css"
import { useSelector } from "react-redux";

export default function MainPage(){
    // style={{backgroundImage: `url(https://lichess1.org/assets/images/background/landscape.jpg)`}}
    const theme = useSelector(state => state.theme.background)
    const userGames = useSelector(state => state.userGames)

    return (
        <div className="main-page" data-board={theme} >

            <NewGame />
            <UserGames />
        </div>
    )
}
