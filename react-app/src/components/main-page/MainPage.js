import React from "react";
import NewGame from "./NewGame";
import "./mainPage.css"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../footer/Footer";

export default function MainPage() {

    const theme = useSelector(state => state.theme.background)
    const history = useHistory()


    return (
        <div className="main-page" data-board={theme} >
            <div className="themed-button-container">
                <div className="themed-title">The world is your oyster!</div>
                <div className="themed-sub-title">What will you do next?</div>
                <NewGame />
                <div className="themed-button" onClick={()=> history.push('/games')}>Continue a Game</div>
                <div className="themed-button" onClick={() => history.push('/theme/add')}>Create a new theme</div>
                <div className="themed-button" onClick={() => history.push('/theme/edit')}>Edit your themes</div>
            </div>
        <Footer />
        </div>
    )
}
