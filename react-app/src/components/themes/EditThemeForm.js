import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTheme, deleteUserTheme, setTheme } from "../../store/theme"
import { useHistory } from "react-router-dom";
import { loadUserThemes, updateThemeById } from "../../store/userThemes";
import { DisplayBoard } from "./DisplayBoard";

export default function EditThemeForm() {
    const currentTheme = useSelector(state => state.theme)
    const userId = useSelector(state => state.session.user.id)

    const dispatch = useDispatch()
    const history = useHistory()

    const [themes, setThemes] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [themeId, setThemeId] = useState('')
    const [themeName, setThemeName] = useState('')
    const [lightSquares, setLightSquares] = useState(currentTheme ? currentTheme.light_squares : '')
    const [darkSquares, setDarkSqares] = useState(currentTheme ? currentTheme.dark_squares : '')
    const [pieceName, setPieceName] = useState('default')
    const [url, setUrl] = useState('')
    const [background, setBackground] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        dispatch(loadUserThemes()).then(themes => setThemes(themes)).then(() =>
            setLoaded(true)
        )
    }, [dispatch]);

    if (!loaded) {
        return (
            <h1>waiting for themes</h1>
        )
    }
    const userThemes = Object.values(themes)

    if (!userThemes.length) {
        return (
            <div className="themed-button-container">
                <div className="themed-title">Trying to push the limits of creativity, huh?</div>
                <div className="themed-title">You still can't edit a theme if you haven't created one yet.</div>
                <div className="themed-button" onClick={() => history.push('/theme/add')}>Create a new theme</div>
            </div>
        )
    }



    const themeChangeHandler = e => {
        setThemeId(e.target.value)
        const theme = themes[e.target.value]
        dispatch(setTheme(theme))
        setThemeName(theme.theme_name)
        setLightSquares(theme.light_squares)
        setDarkSqares(theme.dark_squares)
        // setPieceName(theme.pieceName)
        setUrl(theme.url)
        setBackground(theme.background)
    }

    const lightSquareHandler = e => {
        setLightSquares(e.target.value)
    }

    const handleDeleteClick = e => {
        e.preventDefault()
        if (window.confirm("Are you sure you want to delete this theme?")) {
            dispatch(deleteUserTheme(themeId))
            history.push('/')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newTheme = {
            themeId,
            userId,
            themeName,
            background,
            lightSquares,
            darkSquares,
            pieceName,
            url
        }

        console.log("the new theme on submit is:", newTheme)
        const returnTheme = await dispatch(updateThemeById(newTheme))
        if (returnTheme.errors) {
            const errorArray = []
            returnTheme.errors.forEach(err => {
                const body = err.split(" : ")[1]
                errorArray.push(body)
            })
            setErrors(errorArray)
        } else {
            history.push('/')
        }
    }

    return (
            <form className="themed-form" onSubmit={handleSubmit}>
                <label className="themed-form" htmlFor='theme-name'>Choose your theme:</label>
                <select
                    id='theme-id'
                    value={themeId}
                    onChange={themeChangeHandler}
                    required >
                    <option value="" disabled hidden>Which theme do you want to update</option>
                    {userThemes.map(theme => {
                        return (
                            <option key={`value-${theme.id}`} value={theme.id}>{theme.theme_name}</option>
                        )
                    })}
                </select>

                <input
                    id='theme-name'
                    type="text"
                    value={themeName}
                    onChange={(e) => setThemeName(e.target.value)}
                    required />

                <div className="square-container">

                <label htmlFor='light-squares'>Choose a light square color:</label>
                <input
                    id='light-squares'
                    type="color"
                    value={lightSquares}
                    onChange={lightSquareHandler}
                    required />

                <label htmlFor='dark-squares'>Choose a dark square color:</label>
                <input
                    id='dark-squares'
                    type="color"
                    value={darkSquares}
                    onChange={(e) => setDarkSqares(e.target.value)}
                    required />
                <DisplayBoard />
                </div>
                {/* <label htmlFor='piece-name'>Choose your pieces:</label> */}
                {/* <select
                id='piece-name'
                value={pieceName}
                onChange={(e) => setPieceName(e.target.value)}
                required >
                <option value="brown">Brown pieces coming soon</option>
                <option value="classic">"Classic pieces coming soon"</option>
                <option value="modern">"Modern pieces coiming soon"</option>
                <option value="stone">"Stone pieces coming soon"</option>
                <option value="pretty">"Pretty pieces coming soon"</option>
            </select> */}

                <label htmlFor='background-name'>Choose your menu style:</label>
                <select
                    id='background-name'
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    required >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                    <option value="transparent">Transparent</option>
                </select>
                <label htmlFor="url">(Optional) Enter an image url to set a background image:</label>
                <input
                    id="spot-url"
                    type='url'
                    placeholder="https://example.com"
                    pattern="https://.*"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                ></input>
                <button className="themed-button" onClick={() => history.push('/')}>Cancel</button>
                <button className="themed-button" type="submit">Update Your Theme</button>
                {themeId && <button className="themed-button" onClick={handleDeleteClick}>Delete Your Theme</button>}
            </form>

    )
}
