import React, { useState, useContext } from "react";
import firebase from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../auth/Auth";
import "./Tasks.css"

const ref = firebase.firestore().collection("tasks");

const CreateTask = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");

  function resetInput() {
    setTask("");
    setDesc("");
  }

  function addTask(e) {
    e.preventDefault();
    const owner = currentUser ? currentUser.uid : "unknown";
    const ownerEmail = currentUser ? currentUser.email : "unknown";
    const newTask = {
      task,
      desc,
      owner,
      ownerEmail,
      id: uuidv4(),
      createdOn: firebase.firestore.FieldValue.serverTimestamp(),
      lastUpdate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    ref
      .doc(newTask.id)
      .set(newTask)
      .catch((err) => {
        console.error(err);
      });
    resetInput();
  }

  return (
    <div className="taskInput">
      <h1>Add Task</h1>
      <input
        type="text"
        value={task}
        placeholder="Task"
        onChange={(e) => setTask(e.target.value)}
      />
      <input
        type="text"
        value={desc}
        placeholder="Notes"
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={(e) => addTask(e)}>Submit</button>
    </div>
  );
};

export default CreateTask;
