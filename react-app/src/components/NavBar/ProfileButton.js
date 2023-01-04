import { useEffect, useState } from "react";

export default function ProfileButton() {
    const [isMenuShown, setIsMenuShown] = useState(false)

    const toggleMenu = () => isMenuShown ? setIsMenuShown(false) : setIsMenuShown(true)
    const closeMenu = () => setIsMenuShown(false)

    useEffect(() => {
        if (!isMenuShown) return
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener("click", closeMenu)
    }, [isMenuShown])

    return (
        <>
            <div className="menu" onClick={toggleMenu}>
                username here
            </div>
            {isMenuShown && (
                <div className="profile-container">Choose Your Theme
                    <div>Light</div>
                    <div>Dark</div>
                    <div>Sepia</div>
                    <div>Custom</div>
                </div>
            )}
        </>
    )
}
