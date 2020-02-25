// Stage 1 - Authentication
// Step 1 - Construct an AXIOS request to retrieve a token from the server. You'll use this token to interact with the API
// Step 2 - Save the token to localStorage
// Build a login form to authenticate your users.
import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = props => {
  const loginInitial = {
    username: '',
    password: ''
  };

  const [login, setLogin] = useState(loginInitial);

  const handleChange = e => {
    setLogin({
      ...login,
        [e.target.name]: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    // make a post request to retrieve a token from the api
    // the server will "authenticate" the user based on their credentials
    // if they can be authenticated, the server will return a token - will use localStorage
    axiosWithAuth()
      .post("/login", login)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        setLogin(login);
        props.history.push('/protected');
      })
      .catch(err => {
        localStorage.removeItem('token');
        console.log('Invalid Login: ', err);
      }, []);
  };
  // when you have handled the token, navigate to the BubblePage route
  
  return (
    <section className="login">
      <h1>Welcome to the Bubble App!</h1>
      <p>Please Enter Your Credentials</p>
      <form className="forms" onSubmit={onSubmit}>
        <input
          className="input"
          type="text"
          name="username"
          placeholder="Username"
          value={login.username}
          onChange={handleChange}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          value={login.password}
          onChange={handleChange}
        />
        <button>Login</button>
      </form>
    </section>
  );
};

export default Login;
