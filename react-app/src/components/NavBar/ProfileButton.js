import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setTheme } from "../../store/theme";
import UserThemes from "../themes/UserThemes";

export default function ProfileButton() {
    const [isMenuShown, setIsMenuShown] = useState(false)
    const [areThemesShown, setAreThemesShown] = useState(false)

    const history = useHistory()

    const toggleMenu = () => isMenuShown ? setIsMenuShown(false) : setIsMenuShown(true)
    const toggleThemesMenu = () => areThemesShown ? setAreThemesShown(false) : setAreThemesShown(true)
    const closeMenu = () => {setIsMenuShown(false)}
    const closeThemesMenu = () => setAreThemesShown(false)
    const dispatch = useDispatch()
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
                Choose Theme
            </div>
            {isMenuShown && (
                <>
                <div className="themes container">
                    <div onClick={clickHandler} id='light'>Light</div>
                    <div onClick={clickHandler} id='dark'>Dark</div>
                    <div onClick={clickHandler} id='transparent'>Transparent</div>
                    <div onClick={clickYourThemes} id='transparent'>Your Themes</div>
                    <div onClick={clickCreateTheme}>Create Theme</div>
                </div>
                {areThemesShown && (
                   <div className="user-themes container">
                        <UserThemes />
                   </div>
                )}
                </>

            )}
        </>
    )
}
