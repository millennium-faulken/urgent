import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../auth/Auth";
import firebase from "../firebase.js";
import "./Form.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;

  if (currentUserId) return <Redirect to="/" />;

  return (
    <div className="mainLogin">
      <h3>Login</h3>
      <div className="inputBox">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default SignIn;
