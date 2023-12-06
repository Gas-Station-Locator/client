import "./css/Login.css";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <h1>Welcome to the Gas Station Locator</h1>
      <p>Login with your information below</p>

      <form className="login-form">
        <div className="login-input-group">
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" className="login-input" />
        </div>
        <div className="login-input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="login-input" />
        </div>
        <button type="submit" className="login-submit-btn">
          Login
        </button>

        <button type="submit" className="login-sign-up-btn">
          <Link to="/Sign-Up" style={{color:"white", textDecoration:"none"}}>Sign Up</Link>
        </button>
      </form>
    </div>
  );
}

export default Login;