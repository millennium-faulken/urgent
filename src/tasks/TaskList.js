import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import { AuthContext } from "../auth/Auth";
import CreateTask from "./CreateTask";

const TaskList = () => {
  const { currentUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("tasks");

  useEffect(() => {
    const currentUserId = currentUser ? currentUser.uid : null;

    function getTasks() {
      setLoading(true);
      firebase
        .firestore()
        .collection("tasks")
        .where("owner", "==", currentUserId)
        .orderBy("createdOn", "desc")
        .onSnapshot((querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push(doc.data());
          });
          setTasks(items);
        });
      setLoading(false);
    }
    if (currentUser) {
      getTasks();
    } else {
      return null;
    }
  }, [currentUser]);

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
          {tasks.length > 0 ? tasks.map((post) => (
            <div className="taskPost" key={post.id}>
              <div className="postInfo">
                <h2>{post.task}</h2>
                <p>{post.desc}</p>
              </div>
              <button onClick={() => deleteTask(post)}>Done</button>
            </div>
          )) : <p className="noTasks">You have not added any tasks yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
