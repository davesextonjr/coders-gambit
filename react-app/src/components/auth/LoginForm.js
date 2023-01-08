import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';
import './form.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const history = useHistory()
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      const errorArray = []
      data.forEach(err => {
        const body = err.split(" : ")[1]
        errorArray.push(body)
      })
      setErrors(errorArray);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-background'>
      <form onSubmit={onLogin}>
        <div className='form-title'>Sign in</div>
        <div>
          {errors.map((error, ind) => (
            <div className='error' key={ind}>{error}</div>
          ))}
        </div>
        <div className='form-input'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='email'
            value={email}
            onChange={updateEmail}
            required
          />
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={updatePassword}
            minLength="6"
            required
          />
        </div>
        <button type='submit'>SIGN IN</button>
        <NavLink to='/sign-up' activeClassName='active'>
          Not registered? Register Here.
        </NavLink>
      </form>
    </div>
  );
};

export default LoginForm;
