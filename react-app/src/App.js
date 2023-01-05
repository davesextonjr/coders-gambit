import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Game from './components/game/Game';
import MainPage from './components/main-page/MainPage';
import { authenticate } from './store/session';
import { loadUserGames } from './store/userGames';
import AddThemeForm from './components/themes/AddThemeForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme)


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }


  return (

    <div className='main' data-board={theme.background} style={{ backgroundImage: theme.url ? `url(${theme.url})` : 'none' }}>
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <MainPage />
        </ProtectedRoute>
        <ProtectedRoute path='/game/:id'>
          <Game />
        </ProtectedRoute>
        <ProtectedRoute path='/theme/add'>
          <AddThemeForm />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  </div>
  );
}

export default App;
