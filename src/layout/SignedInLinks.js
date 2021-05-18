import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import firebase from "../firebase";
import "./Nav.css";

const logOut = async () => {
  firebase.auth().signOut();
};

const ref = firebase.firestore().collection("users");

const SignedInLinks = () => {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (currentUser) {
      function userInfo() {
        ref
          .doc(currentUser.uid)
          .get()
          .then((doc) => {
            const items = [];
            items.push(doc.data());
            setUser(items);
          });
      }
      userInfo();
    } else {
      return null;
    }
  }, [currentUser]);

  return (
    <div className="signedIn">
      <NavLink to="/" className="initials">
        {user.map((info) => (
          <h1 key={currentUser.uid}>{info.initials}</h1>
        ))}
      </NavLink>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default SignedInLinks;
