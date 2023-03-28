import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "../../utils/mutations";
import Auth from '../../utils/auth';
import States from './StateOptions';

function Signup() {

  const [userFormData, setuserFormData] = useState({
    username: '',
    email: '',
    password: '',
    homeTown: '',
    state: '',
  });
  const [createUser, {error} ] = useMutation(CREATE_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setuserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createUser({
        variables: { ...userFormData }
      });
      const token = data.createUser.token;
      Auth.login(token);
      localStorage.setItem('town', userFormData.homeTown)
      localStorage.setItem('state', userFormData.state)

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="signup">
      <h1>Signup</h1>
      <form onSubmit={handleFormSubmit}>
        <fieldset>
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form-control"
              placeholder="Email@"
              name="email"
              type="email"
              value={userFormData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-area">
            <label htmlFor="password">Password</label>
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
          <div className="input-area">
            <label htmlFor="homeTown">Home Town</label>
            <input
              id="homeTown"
              className="form-control"
              placeholder="Your city"
              name="homeTown"
              type="homeTown"
              value={userFormData.homeTown}
              onChange={handleChange}
            />
          </div>
          <States userFormData={userFormData} handleChange={handleChange}/>
          <button
            className="formBtn" type="submit">
            Submit
          </button>
        </fieldset>
      </form>
      {error &&
        <div>Whoops! This is what the computer is telling me<br></br>
        {error.message}</div>
      }

    </main>
  )
};

export default Signup;