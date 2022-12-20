import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './form.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
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
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='form-input'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            type='text'
            value={email}
            onChange={updateEmail}
          />
        </div>
        <div className='form-input'>
          <label htmlFor='password'>Password</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={updatePassword}
          />
        </div>
        <button type='submit'>SIGN IN</button>
      </form>
    </div>
  );
};

export default LoginForm;
