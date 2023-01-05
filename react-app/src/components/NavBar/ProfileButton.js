import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../../store/theme";

export default function ProfileButton() {
    const [isMenuShown, setIsMenuShown] = useState(false)

    const toggleMenu = () => isMenuShown ? setIsMenuShown(false) : setIsMenuShown(true)
    const closeMenu = () => setIsMenuShown(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isMenuShown) return
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener("click", closeMenu)
    }, [isMenuShown])

    const clickHandler = e => {
        e.stopPropagation()
        // console.log(e.target.id)
        dispatch(setTheme({background: e.target.id, url: ""}))
    }

    const clickYourThemes = e => {
        e.stopPropagation()

        dispatch(setTheme({background: e.target.id, url: "https://lichess1.org/assets/images/background/landscape.jpg"}))
    }

    return (
        <>
            <div className="menu" onClick={toggleMenu}>
                username here
            </div>
            {isMenuShown && (
                <div className="profile-container">Choose Your Theme
                    <div onClick={clickHandler} id='light'>Light</div>
                    <div onClick={clickHandler} id='dark'>Dark</div>
                    <div onClick={clickHandler} id='sepia'>Sepia</div>
                    <div onClick={clickYourThemes} id='transparent'>Your Themes</div>
                    <div>Create Theme</div>
                </div>
            )}
        </>
    )
}
