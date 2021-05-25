import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userLoggedIn from '../../redux-state/actions/loginActivity.js';

const Login = () => {
  const authenticated = useSelector(state => state.viewReducer.isAuthenticated);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoggedIn(e.target.email.value, e.target.password.value));
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Username:
            <input name="email" type="email" placeholder="ex: user@email.com" />
          </label>
          <label>
            Password:
            <input name="password" type="password" placeholder="Password" />
          </label>
          {authenticated === false ? 'INVALID COMBO' : <></>}
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login;