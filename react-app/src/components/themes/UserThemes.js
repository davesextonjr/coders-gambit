import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { setTheme } from "../../store/theme"
import { loadUserThemes } from "../../store/userThemes"
import './UserTheme.css'

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
            null
        )
    }
    const userThemes = Object.values(themes)

    const clickHandler = e => {
        e.stopPropagation()
        const theme = themes[e.target.id]
        dispatch(setTheme(theme))
        console.log(theme)
    }


    return(
        <>
            {userThemes.length ?
            <>
                {userThemes.map(theme => {
                    return (
                        <div
                        key={`theme-{theme.id}`}
                        className='theme-name'
                        id={theme.id}
                        onClick={clickHandler}
                        >{theme.theme_name}</div>
                        )
                    })}
                <div className='edit-button' onClick={() => history.push('/theme/edit')}>Edit Your Themes</div>

            </>
            :
            <div onClick={() => history.push('/theme/add')}>Add Styles First</div>}


        </>

    )
}
