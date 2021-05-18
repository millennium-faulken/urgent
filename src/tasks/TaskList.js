import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import { AuthContext } from "../auth/Auth";
import CreateTask from "./CreateTask";

const TaskList = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("tasks");

  useEffect(() => {
    function getTasks() {
      setLoading(true);
      if (currentUserId) {
        ref
          .where("owner", "==", currentUserId)
          .orderBy("createdOn")
          .get()
          .then((item) => {
            const items = [];
            item.forEach((doc) => {
              items.push(doc.data());
            });
            setTasks(items);
          });
        setLoading(false);
      } else {
        return null;
      }
    }
    getTasks();
  }, [ref, currentUserId]);

  function deleteTask(post) {
    ref
      .doc(post.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="taskContainer">
      <CreateTask />
      <hr></hr>
      <div className="mainTasks">
        <div className="tasksTitle">
          <h1>Tasks</h1>
          {loading ? <h1>Loading Tasks...</h1> : null}
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
  );
};

export default TaskList;
