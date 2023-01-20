
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import ProfileButton from './ProfileButton';
import './NavBar.css'
import { useSelector } from 'react-redux';
import { CreateNewGame } from "../game/game-utilities";



const NavBar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  let newGameInfo

  if (user){
    newGameInfo = {
    white_id: user.id,
    black_id: user.id,
    history,
    dispatch
  }
}


  return (

    <>
      {user ?
        <nav>

          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>

          <NavLink to='/games' exact={true} activeClassName='active'>
            Your Games
          </NavLink>

          <div className="menu" onClick={() => CreateNewGame(newGameInfo)}>
            Start a New Game
          </div>

          <NavLink to='/theme/add' exact={true} activeClassName='active'>
            Create New Theme
          </NavLink>

          <ProfileButton />

        </nav>
        :
        <div></div>

      }

    </>





  );
}

export default NavBar;
