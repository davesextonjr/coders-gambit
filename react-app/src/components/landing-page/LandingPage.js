import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { login } from "../../store/session"
import './landingPage.css'

export default function LandingPage() {
    const history = useHistory()
    const dispatch = useDispatch()


    const clickDemoHandler = async e => {
        const data = await dispatch(login('bobbie@aa.io', 'password'))
        if (data) {
            alert('something went wrong')
        }
        history.push('/')
    }

    return (
        <div className="splash-background" style={{backgroundImage: `url(https://lichess1.org/assets/images/background/landscape.jpg)`}}>
            <h1>Welcome to Coder's Gambit</h1>
            <h2>You're invited to experience the first step in a developer's journey to make a fully customizable chess experience</h2>
            <div className="button-container">
                <div className="title">Sign in or Register to Begin Playing</div>
                <button onClick={(e)=>(history.push('/login'))}>Sign In</button>
                <button onClick={(e)=>(history.push('/sign-up'))}>Register</button>
                <button onClick={clickDemoHandler}>Demo User</button>
            </div>
        </div>
    )
}
