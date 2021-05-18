import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { AuthContext } from "../auth/Auth";
import "./Nav.css";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const links = currentUser ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <div className="container">
      <Link to="/" className="brand-logo">
        Urgent!
      </Link>
      {links}
    </div>
  );
};

export default Nav;
