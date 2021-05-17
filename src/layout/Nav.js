import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { AuthContext } from "../auth/Auth";
import "./Nav.css";

const Nav = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const links = currentUserId ? <SignedInLinks /> : <SignedOutLinks />;

  return (
    <nav>
      <div className="container">
        <Link to="/" className="brand-logo">
          Urgent!
        </Link>
        {links}
      </div>
    </nav>
  );
};

export default Nav;
