import React from "react";
import { NavLink } from "react-router-dom";


const SignedOutLinks = () => {
  return (
    <div>
      <ul >
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/signin">Login</NavLink>
      </ul>
    </div>
  );
};

export default SignedOutLinks;
