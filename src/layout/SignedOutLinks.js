import React from "react";
import { NavLink } from "react-router-dom";
import "./Nav.css";

const SignedOutLinks = () => {
  return (
    <div className="signedOut">
      <NavLink to="/signup" className="signUp">
        Sign Up
      </NavLink>
      <NavLink to="/signin" className="signIn">
        Login
      </NavLink>
    </div>
  );
};

export default SignedOutLinks;
