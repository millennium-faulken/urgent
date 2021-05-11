import React, { useState } from "react";
import firebase from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)

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
    setLoggedIn(false)
  };

  const resetInput = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h1>Login</h1>
      <div className="inputBox">
        <h3>Login/Register</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        {loggedIn ? null : <button onClick={register}>Register</button> }
        {loggedIn ? <h1>Logged In</h1> : <button onClick={login}>Login</button> }
        <button onClick={logOut}>Log Out</button>
      </div>
    </>
  );
};

export default Login;