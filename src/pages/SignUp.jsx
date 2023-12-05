import './css/SignUp.css';
import React from 'react'
import { Link } from 'react-router-dom'
function login() {
  return (
    <div className="App">
      <h1>
		Thank you for Signing Up
	  </h1>
	  <p>
		Please enter your information below
	  </p>

	  <form>
        <div className="input-group">
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
		<button type="submit" className="sign-btn">
		<Link to="/Login">Sign up with entered Info</Link>
        </button>
      </form>
    </div>
  );
}

export default login;