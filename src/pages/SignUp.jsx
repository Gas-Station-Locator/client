import "./css/SignUp.css";
import React from "react";
import { Link } from "react-router-dom";
function SignUp() {
  return (
    <div className="sign-up">
      <h1>Thank you for Signing Up</h1>
      <p>Please enter your information below</p>

      <form className="sign-up-form">
        <div className="sign-up-input-group">
          <label htmlFor="name">Username:</label>
          <input type="text" id="name" className="sign-up-input"/>
        </div>
        <div className="sign-up-input-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="sign-up-input"/>
        </div>
        <button type="submit" className="sign-up-btn">
          <Link to="/Login" style={{color:"white", textDecoration:"none"}}>Sign up with entered Info</Link>
        </button>
      </form>
    </div>
  );
}

export default SignUp;