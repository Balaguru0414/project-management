import axios from "axios";
import React from "react";
import { useState } from "react";

function Task_list({ tasks, changeTaskStatus, deleteTask, updateTaskTitle }) {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleEditTitle = (taskId, currentTitle) => {
    setEditingTaskId(taskId);
    setEditedTitle(currentTitle);
  };

  const handleSaveTitle = (taskId) => {
    if (editedTitle.trim() === "") {
      return; // Prevent saving empty title
    }
    updateTaskTitle(taskId, editedTitle);
    setEditingTaskId(null);
  };
  return (
    <div className="task-list flex-1 mt-4">
      <h2 className="text-center text-3xl font-bold">Project List</h2>
      <table className="w-full bg-white rounded-lg shadow-lg mt-4">
        <thead>
          <tr className="text-left border-b-2 border-gray-300">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-white">
          {tasks.map((task, i) => (
            <tr key={task._id} className="">
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2">
                {editingTaskId === task._id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="h-9 focus:outline-none focus:ring ring-blue-600 rounded p-2"
                    />
                    <button
                      className="ml-2 bg-blue-500 p-1 rounded text-white font-bold"
                      onClick={() => handleSaveTitle(task._id)}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h1
                      onClick={() => handleEditTitle(task._id, task.title)}
                      className="cursor-pointer"
                    >
                      {task.title}
                    </h1>
                  </>
                )}
              </td>
              <td className="px-4 py-2 ">{task.status}</td>
              <td className="px-4 py-2 flex gap-4">
                <button
                  className="bg-red-600 p-1 rounded text-white font-bold"
                  onClick={() => changeTaskStatus(task._id, "Pending")}
                >
                  Pending
                </button>
                <button
                  className="bg-yellow-600 p-1 rounded text-white font-bold"
                  onClick={() => changeTaskStatus(task._id, "InProgress")}
                >
                  In Progress
                </button>
                <button
                  className="bg-green-600 p-1 rounded text-white font-bold"
                  onClick={() => changeTaskStatus(task._id, "Completed")}
                >
                  Completed
                </button>
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-gray-600 p-1 rounded text-white font-bold"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Task_list;
