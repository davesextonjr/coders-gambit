import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { setTheme } from "../../store/theme";
import UserThemes from "../themes/UserThemes";
import LogoutButton from "../auth/LogoutButton";


export default function ProfileButton() {
    const history = useHistory()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)


    const [isMenuShown, setIsMenuShown] = useState(false)
    const [areThemesShown, setAreThemesShown] = useState(false)


    const toggleMenu = () => isMenuShown ? setIsMenuShown(false) : setIsMenuShown(true)
    const toggleThemesMenu = () => areThemesShown ? setAreThemesShown(false) : setAreThemesShown(true)
    const closeMenu = () => {setIsMenuShown(false)}
    const closeThemesMenu = () => setAreThemesShown(false)


    useEffect(() => {
        if (!isMenuShown) return
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener("click", closeMenu)
    }, [isMenuShown])

    useEffect(() => {
        if (!areThemesShown) return
        document.addEventListener('click', closeThemesMenu)
        return () => document.removeEventListener("click", closeThemesMenu)
    }, [areThemesShown])





    const clickHandler = e => {
        e.stopPropagation()
        // console.log(e.target.id)
        let url = ""
        if (e.target.id === "transparent") url = "https://lichess1.org/assets/images/background/landscape.jpg"
        dispatch(setTheme({background: e.target.id, url: url, light_squares:"#faebd7", dark_squares:"#b8860b"}))
    }

    const clickYourThemes = e => {
        e.stopPropagation()
        setAreThemesShown(true)

    }

    const clickCreateTheme = e => {
        e.stopPropagation()

        history.push('/theme/add')
    }

    return (
        <>
            <div className="menu" onClick={toggleMenu}>
                Options
            </div>
            {isMenuShown && !areThemesShown && (
                <>
                <div className="themes container">
                    <div className="no-hover">THEMES</div>
                    <div className="divider"></div>

                    <div onClick={clickHandler} id='light'>Light</div>
                    <div onClick={clickHandler} id='dark'>Dark</div>
                    <div onClick={clickHandler} id='transparent'>Transparent</div>

                    <div className="divider"></div>

                    <div onClick={clickYourThemes} id='transparent'>Your Themes</div>
                    <div onClick={clickCreateTheme}>Create Theme</div>

                    <div className="divider"></div>
                    <LogoutButton />
                </div>
                </>
            )}
            {isMenuShown && areThemesShown && (
                <div className="user-themes container">
                         <UserThemes />
                </div>
            )}
        </>
    )
}
