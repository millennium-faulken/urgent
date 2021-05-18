import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../auth/Auth";
import "./Urgent.css";
import { Redirect } from "react-router";
import TaskList from "../tasks/TaskList";

function Urgent() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  if (!currentUserId) return <Redirect to="/signin" />;

  return (
    <div className="main">
      <div className="urgent">{/* <h1>URGENT!</h1> */}</div>
      <TaskList />
    </div>
  );
}

export default Urgent;
