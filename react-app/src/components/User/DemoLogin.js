import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../store/session";

export default function DemoLogin(){
    const history = useHistory()
    const dispatch = useDispatch()

    const clickDemoHandler = async e => {
        const data = await dispatch(login('bobbie@aa.io', 'password'))
        if (data) {
            alert('something went wrong')
        }
        history.push('/')
    }

    return(
        <button onClick={clickDemoHandler}>Demo User</button>
    )
}
