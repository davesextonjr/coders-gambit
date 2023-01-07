import React from "react"
import { useHistory } from "react-router-dom"
import './landingPage.css'

export default function LandingPage() {
    const history = useHistory()
    return (
        <div className="splash-background" style={{backgroundImage: `url(https://lichess1.org/assets/images/background/landscape.jpg)`}}>
            <h1>Welcome to Coder's Gambit</h1>
            <h2>You're invited to experience the first step in a developer's journey to make a fully customizable chess experience</h2>
            <div className="button-container">
                <div className="title">Sign in or Register to Begin Playing</div>
                <button onClick={(e)=>(history.push('/login'))}>Sign In</button>
                <button onClick={(e)=>(history.push('/sign-up'))}>Register</button>
                <button>Demo User</button>
            </div>
        </div>
    )
}
