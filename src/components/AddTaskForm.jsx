import axios from "axios";
import React, { useState } from "react";

function AddTaskForm({ addTask, fetchData }) {
  const [title, setTitle] = useState("");

  // Create new Project
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;
    await axios.post(`http://localhost:8000/api/tasks`, {
      title,
      status: "Pending",
    });
    fetchData();
    // const newTask = {
    //   id: new Date().getTime(),
    //   title,
    //   status: "Pending",
    // };
    // addTask(newTask);
    setTitle("");
  };

  return (
    <div className="Task-Form max-w-72 px-5 drop-shadow-md shadow-gray-400 mt-4 min-h-dvh">
      <h2 className="text-2xl mt-4 font-bold text-center">Add New Project</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="h-9 w-full focus:outline-none focus:ring ring-blue-600 rounded p-2"
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-md mt-4 font-bold"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;
