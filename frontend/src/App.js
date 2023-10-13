import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // Read all todos
  useEffect(() => {
    axios.get("http://localhost:8000/api/todo").then((res) => {
      setTasks(res.data);
    });
  });

  // Post a todo
  const addTask = () => {
    axios
      .post("http://localhost:8000/api/todo/", {
        title: title,
        description: desc,
      })
      .then((res) => console.log(res));
  };

  const deleteItem = (title) => {
    axios
      .delete(`http://localhost:8000/api/todo/${title}`)
      .then((res) => console.log(res.data));
  };

  return (
    // Main container
    <div className="container flex flex-col mx-auto my-6 shadow-2xl border border-black-200 p-6 rounded-lg">
      {/* Task Manager Headline */}
      <div className="flex justify-center bg-blue-600 text-6xl text-white rounded-lg p-4">
        Task Manager
      </div>
      {/* Technologies */}
      <div className="flex justify-center bg-blue-600 text-2xl text-white rounded-lg p-4 mt-4">
        FASTAPI - React - MongoDB
      </div>

      {/* Add task */}
      <div className="mt-16 bg-black text-white mx-32 rounded-lg">
        <h1 className="text-center text-2xl p-2">Add Your Task</h1>
      </div>

      <form className="flex flex-col mx-32" onSubmit={addTask}>
        <input
          type="text"
          className="p-2 my-4 focus:outline-none rounded-lg border border-black-700"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="p-2 focus:outline-none rounded-lg border border-black-700"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="rounded-full text-sky-600 p-2 border border-sky-600 my-4"
          >
            Add Task
          </button>
        </div>
      </form>

      {/* Your Tasks Tagline*/}
      <div className="bg-black text-white mx-32 rounded-lg mt-10">
        <h1 className="text-center text-2xl p-2">Your Tasks</h1>
      </div>

      {/* Tasks */}
      <div className="flex flex-col mt-4 text-2xl space-y-2">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="flex flex-row justify-center items-center space-x-5 border-b border-blue-200 pb-4 mx-32"
          >
            <h1 className="flex">{task.title}</h1>
            <h1 className="flex">:</h1>
            <h1 className="flex">{task.desc}</h1>
            <button
              className="bg-green-200 rounded-full px-1"
              onClick={() => deleteItem(task.title)}
            >
              &#10003;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
