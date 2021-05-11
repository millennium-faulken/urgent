import React, { useState } from "react";
import firebase from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const register = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resetInput();
        setLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logOut = () => {
    firebase.auth().signOut();
    setLoggedIn(false);
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="inputBox">
        {loggedIn ? null : <h3>Login/Register</h3>}
        {loggedIn ? null : (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        )}
        {loggedIn ? null : (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        )}
        {loggedIn ? null : <button onClick={register}>Register</button>}
        {loggedIn ? null : <button onClick={login}>Login</button>}
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Login;