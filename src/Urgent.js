import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import { v4 as uuidv4 } from "uuid";
import "./Urgent.css";

function Urgent() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("tasks");

  function getTasks() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setTasks(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  function resetInput() {
    setTask("");
    setDesc("");
  }

  function addTask(e) {
    e.preventDefault();
    const newTask = {
      task,
      desc,
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
      <div className="urgent">
        <h1>URGENT!</h1>
      </div>
      <div className="taskContainer">
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
