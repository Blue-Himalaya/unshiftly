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
    console.log("this is e", e.target)
    dispatch(userLoggedIn(e.target.username.value, e.target.password.value));
  }
  return (
    <div className="entireLogIn">
      <h1 className="loginHeader">scheduling made easy.</h1>
      <form className="loginForm" onSubmit={onSubmit}>
        <div>
          <div className="formLabelsInputs">
          <label
            className="labelText">
            user id:
          </label>
        <br></br>
          <input

          className="longInputs"
          name="username"
          type="username"
          placeholder="ex: RayRay"/>
        </div>
        <div className="formLabelsInputs">
          <label
          className="labelText">
          password:
          </label>
        <br></br>
          <input

          className="longInputs"
          name="password"
          type="password"
          placeholder="Password" />
        </div>
        {authenticated === false ? 'INVALID COMBO' : <></>}
       </div>
       <button
      type="submit"
      className="loginButton">
      <span className="buttonText" >Log in</span>
      </button >
      </form>

    </div>
  )
}

export default Login;