import React, { useContext } from "react";
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
