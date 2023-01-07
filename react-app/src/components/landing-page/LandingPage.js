import React from "react"
import './landingPage.css'

export default function LandingPage() {

    return (
        <div className="splash-background">
            <h1>Welcome to Coder's Gambit</h1>
            <h2>You're invited to experience the first step in a developer's journey to make a fully customizable chess experience</h2>
            <div className="button-container">
                <div className="title">Sign in or Register to Begin Playing</div>
                <button>Sign In</button>
                <button>Register</button>
                <button>Demo User</button>
            </div>
        </div>
    )
}
