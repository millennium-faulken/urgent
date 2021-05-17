import React, { useState, useEffect, useContext } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import Login from "./auth/Login";
import Welcome from "./Welcome";
import { AuthContext } from "./auth/Auth";
import "./Urgent.css";
import { get } from "mongoose";

function Urgent() {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("tasks");

  function getTasks() {
    setLoading(true);
    if (currentUser) {
      ref.where("owner", "==", currentUser.uid).onSnapshot((querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setTasks(items);
        setLoading(false);
      });
    } else {
      return null;
    }
  }

  useEffect(() => {
    getTasks();
  }, [firebase, currentUser]);

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

  function deleteTask(post) {
    ref
      .doc(post.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="main">
      <Login />
      <div className="urgent">
        <h1>URGENT!</h1>
      </div>
      <div className="taskContainer">
        <Welcome />
        <div className="taskInput">
          <h3>Add Task</h3>
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
        <hr />
        <div className="mainTasks">
          <div className="tasksTitle">
            <h1>Tasks</h1>
            {loading ? <h1>Loading...</h1> : null}
          </div>
          <div className="postContainer">
            {tasks.map((post) => (
              <div className="taskPost" key={post.id}>
                <div className="postInfo">
                  <h2>{post.task}</h2>
                  <p>{post.desc}</p>
                </div>
                <button onClick={() => deleteTask(post)}>Done</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Urgent;
