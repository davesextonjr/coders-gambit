import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Passwords must match"])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-background'>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className='form-input'>User Name</label>
          <input
            type='text'
            name='username'
            placeholder="don't over-think but do use at least 3 characters"
            onChange={updateUsername}
            value={username}
            minLength="3"
            maxLength="25"
            required
          ></input>
        </div>
        <div className='form-input'>
          <label>Email</label>
          <input
            type='email'
            name='email'
            placeholder='to use junk-email or not...hmmm'
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div className='form-input'>
          <label>Password</label>
          <input
            type='password'
            name='password'
            placeholder='password must be at least 6 characters'
            onChange={updatePassword}
            value={password}
            minLength='6'
            required
          ></input>
        </div>
        <div className='form-input'>
          <label>Repeat Password</label>
          <input
            type='password'
            name='repeat_password'
            placeholder='see if you can remeber what you just typed'
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
            minLength="6"
          ></input>
        </div>
        <button type='submit'>REGISTER</button>
      </form>
    </div>
  );
};

export default SignUpForm;
