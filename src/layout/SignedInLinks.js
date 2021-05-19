import React, { useState, useEffect, useContext, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import firebase from "../firebase";
import "./Nav.css";

const ref = firebase.firestore().collection("users");

const logOut = async () => {
  await firebase.auth().signOut();
};

const SignedInLinks = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  const userInfo = useCallback(() => {
    ref
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const items = [];
        items.push(doc.data());
        setUser(items);
      });
  }, [currentUser.uid]);

  useEffect(() => {
    if (currentUser) {
      userInfo();
    } else {
      return null;
    }
  }, [userInfo, currentUser]);

  return (
    <div className="signedIn">
      <NavLink to="/" className="initials">
        {user.map((info) => (
          <h1 key={currentUser.uid}>{info.initials}</h1>
        ))}
      </NavLink>
      <NavLink to="/" className="signOut" onClick={logOut}>
        Log Out
      </NavLink>
    </div>
  );
};

export default SignedInLinks;
