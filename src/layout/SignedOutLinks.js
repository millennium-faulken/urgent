import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";


const SignedOutLinks = () => {
  return (
    <div>
      <ul >
        <NavLink to="/signup" className="signUp">Sign Up</NavLink>
        <br></br>
        <NavLink to="/signin" className="signIn">Login</NavLink>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
