import "./css/Login.css";
import React from "react";
import { Link } from "react-router-dom";

function login() {
  return (
    <div className="main">
      <h1>Welcome to the Gas Station Locator</h1>
      <p>Login with your information below</p>

      <form>
        <div className="input-group">
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>

        <button type="submit" className="sign-btn">
          <Link to="/SignUp">Sign Up</Link>
        </button>
      </form>
    </div>
  );
}

export default login;
