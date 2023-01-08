
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton';
import './NavBar.css'
import { useSelector } from 'react-redux';



const NavBar = () => {
  const user = useSelector(state => state.session.user)

  return (

    <>
      {user ?
      <nav>

        <NavLink to='/' exact={true} activeClassName='active'>
          Coder's Gambit
        </NavLink>

        <NavLink to='/games' exact={true} activeClassName='active'>
          Your Games
        </NavLink>

        <NavLink to='/theme/add' exact={true} activeClassName='active'>
          Create New Theme
        </NavLink>

        <NavLink to='/theme/edit' exact={true} activeClassName='active'>
          Edit Your Themes
        </NavLink>

        <ProfileButton />

        <LogoutButton />

      </nav>
      :
      <div></div>

    }

    </>





  );
}

export default NavBar;
