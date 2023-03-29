import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';


function Login() {

  const [userFormData, setUserFormData] = useState({ username: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
      const town = Auth.getProfile().data.homeTown;
      localStorage.setItem('town', town)
      
      const state = Auth.getProfile().data.state;
      localStorage.setItem('state', state)

      window.location.replace('/')
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: '',
      password: '',
    });
  };

  return (
    <main className="login">
      <h1>login</h1>
      <form onSubmit={handleFormSubmit}>
        <fieldset className="form-box">
          <div className="input-area">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-control"
              placeholder="Username"
              name="username"
              type="username"
              value={userFormData.username}
              onChange={handleChange}
            />
          </div>
          <div className="input-area">
            <label id="password-label" htmlFor="password">Password</label>
            <input
              id="password"
              className="form-control"
              placeholder="******"
              name="password"
              type="password"
              value={userFormData.password}
              onChange={handleChange}
            />
          </div>
          <button
            className="formBtn" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
      {error &&
        <div>Seems there was a problem with your login</div>
      }
    </main>
  )
};

export default Login;