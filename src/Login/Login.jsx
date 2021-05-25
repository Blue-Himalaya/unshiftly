import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import userLoggedIn from '../../redux-state/actions/loginActivity.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(userLoggedIn(e.target.email.value, e.target.password.value));
  }
// create user
  // when
// login user
  // send request to server to
  // check if user exists
  // if user exists, log them in
  // with relative credentials
  // (update redux state to some shit)
  // if user does not exist
  // throw err; user does not exist
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
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  )
}

export default Login;