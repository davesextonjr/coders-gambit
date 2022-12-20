
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
  return (
    <nav>

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

    </nav>
  );
}

export default NavBar;
