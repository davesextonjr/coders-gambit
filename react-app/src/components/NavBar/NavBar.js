
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import ProfileButton from './ProfileButton';
import './NavBar.css'
import { useSelector } from 'react-redux';

const NavBar = () => {
  const theme = useSelector(state => state.theme.background)

  return (
    <nav data-board={theme}>

          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>

          <NavLink to='/login' exact={true} activeClassName='active'>
            Sign In
          </NavLink>

          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Register

          </NavLink>

          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>

          <LogoutButton />

          <ProfileButton />

    </nav>
  );
}

export default NavBar;
