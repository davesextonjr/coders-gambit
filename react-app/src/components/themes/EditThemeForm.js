import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTheme, setTheme } from "../../store/theme"
import { useHistory } from "react-router-dom";
import { loadUserThemes } from "../../store/userThemes";

export default function EditThemeForm() {
    const currentBackground = useSelector(state => state.theme.background)
    const userId = useSelector(state => state.session.user.id)

    const dispatch = useDispatch()
    const history = useHistory()

    const [themes, setThemes] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [themeId, setThemeId] = useState('1')
    const [themeName, setThemeName] = useState('default')
    const [lightSquares, setLightSquares] = useState('#e2e4f5')
    const [darkSquares, setDarkSqares] = useState('#4e5159')
    const [pieceName, setPieceName] = useState('default')
    const [url, setUrl] = useState('')
    const [background, setBackground] = useState(currentBackground)

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

    console.log(themes)



    const themeChangeHandler = e => {
        setThemeId(e.target.value)
        const theme = themes[e.target.value]
        console.log("the theme is", {theme})
        dispatch(setTheme(theme))
        setThemeName(theme.theme_name)
        setLightSquares(theme.light_squares)
        setDarkSqares(theme.dark_squares)
        setPieceName(theme.pieceName)
        setUrl(theme.url)
        setBackground(theme.background)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);

        const newTheme = {
            userId,
            themeName,
            background,
            lightSquares,
            darkSquares,
            pieceName,
            url
        }

        console.log(newTheme)
        const returnTheme = await dispatch(addTheme(newTheme))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
        // if(errors.length) return alert("something went wrong");
        history.push(`/`)

    }

    return (
        <form onSubmit={() => console.log("submitted")}>
            <label htmlFor='theme-name'>Choose your theme:</label>
            <select
                id='theme-name'
                value={themeId}
                onChange={themeChangeHandler}
                required >
                {userThemes.map(theme => {
                    return(
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

            <label htmlFor='light-squares'>Choose a light square color:</label>
            <input
                id='light-squares'
                type="color"
                value={lightSquares}
                onChange={(e) => setLightSquares(e.target.value)}
                required />

            <label htmlFor='dark-squares'>Choose a dark square color:</label>
            <input
                id='dark-squares'
                type="color"
                value={darkSquares}
                onChange={(e) => setDarkSqares(e.target.value)}
                required />

            <label htmlFor='piece-name'>Choose your pieces:</label>
            <select
                id='piece-name'
                value={pieceName}
                onChange={(e) => setPieceName(e.target.value)}
                required >
                <option value="brown">Brown pieces coming soon</option>
                <option value="classic">"Classic pieces coming soon"</option>
                <option value="modern">"Modern pieces coiming soon"</option>
                <option value="stone">"Stone pieces coming soon"</option>
                <option value="pretty">"Pretty pieces coming soon"</option>
            </select>

            <label htmlFor='background-name'>Choose your background:</label>
            <select
                id='background-name'
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                required >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="sepia">Sepia</option>
                <option value="transparent">transparent</option>
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
            <button onClick={() => history.push('/')}>Cancel</button>
            <button type="submit">Update Your Theme</button>
        </form>
    )
}
