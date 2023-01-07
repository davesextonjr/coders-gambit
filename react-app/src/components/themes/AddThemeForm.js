import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTheme, setTheme } from "../../store/theme"
import { useHistory } from "react-router-dom";

export default function AddThemeForm() {
    const currentBackground = useSelector(state => state.theme.background)
    const userId = useSelector(state => state.session.user.id)
    const history = useHistory()
    const [themeName, setThemeName] = useState('')
    const [lightSquares, setLightSquares] = useState('')
    const [darkSquares, setDarkSqares] = useState('')
    const [pieceName, setPieceName] = useState('default')
    const [url, setUrl] = useState('')
    const [background, setBackground] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newTheme = {
            userId,
            themeName,
            background,
            lightSquares,
            darkSquares,
            pieceName,
            url
        }


        const returnTheme = await dispatch(addTheme(newTheme))
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
            <div>
                {errors.map((error, ind) => (
                    <div className='error' key={ind}>{error}</div>
                ))}
            </div>

            <label htmlFor='theme-name'>Choose a theme name:</label>
            <input
                id='theme-name'
                type="text"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
                placeholder='Whatever you choose keep it between 3 and 25 characters'
                minLength='3'
                maxLength='25'
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

            <label htmlFor='background-name'>Choose your background:</label>
            <select
                id='background-name'
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                required >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
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
