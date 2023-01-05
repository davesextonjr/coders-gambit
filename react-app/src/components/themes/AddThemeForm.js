import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "../../store/theme"

export default function AddThemeForm() {
    const currentBackground = useSelector(state => state.theme.background)
    const userId = useSelector(state => state.session.user.id)

    const [themeName, setThemeName] = useState('default')
    const [lightSquares, setLightSquares] = useState('#e2e4f5')
    const [darkSquares, setDarkSqares] = useState('#4e5159')
    const [pieceName, setPieceName] = useState('default')
    const [url, setUrl] = useState('')
    const [background, setBackground] = useState(currentBackground)

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);

        const newTheme = {
            userId,
            theme_name: themeName,
            background,
            light_squares: lightSquares,
            dark_squares: darkSquares,
            piece_name: pieceName,
            url
        }

    console.log(newTheme)
        dispatch(setTheme(newTheme))
        // const returnSpot = await dispatch(addSpotThunk(newSpot))
        // .catch(async (res) => {
        //     const data = await res.json();
        //     if (data && data.errors) setErrors(data.errors);
        // });
        // if(errors.length) return alert("something went wrong");
        // history.push(`/spots/${returnSpot.id}`)

    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor='theme-name'>Choose a theme name:</label>
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
            <button type="submit">Add Your Theme</button>
        </form>
    )
}