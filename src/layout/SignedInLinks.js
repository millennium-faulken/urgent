import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/Auth";
import firebase from "../firebase";

const logOut = () => {
  firebase.auth().signOut();
};

const ref = firebase.firestore().collection("users");

const SignedInLinks = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [user, setUser] = useState([]);

  const userInfo = (user) => {
    if (user) {
      ref
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          console.log(doc.data().initials);
            return <h2>{doc.data().initials}</h2>

        });
    }
  };

  return (
    <div>
      <ul className="right">
        <button onClick={logOut}>Log Out</button>
        
        {/* <NavLink to="/" className="btn btn-floating pink lighten-1">
            {props.profile.initials}
          </NavLink> */}
      </ul>
    </div>
  );
};

export default SignedInLinks;
