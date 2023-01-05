import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setTheme } from "../../store/theme"
import { loadUserThemes } from "../../store/userThemes"

export default function UserThemes(){
    const dispatch = useDispatch()
    const [themes, setThemes] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const history = useHistory()
    useEffect(() => {
        dispatch(loadUserThemes()).then(themes => setThemes(themes)).then(() =>
            setLoaded(true)
        )
    }, [dispatch]);
    if (!loaded) {
        return (
            <h1>waiting for user</h1>
        )
    }
    const userThemes = Object.values(themes)

    const clickHandler = e => {
        e.stopPropagation()
        const theme = userThemes[e.target.id - 1]
        dispatch(setTheme(theme))
        console.log(theme)
    }


    return(
        <>
            {userThemes.map(theme => {
                return (
                    <div
                    key={`theme-{theme.id}`}
                    class='theme-name'
                    id={theme.id}
                    onClick={clickHandler}
                    >{theme.theme_name}</div>
                )
            })}
        </>
    )
}
