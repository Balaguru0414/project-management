import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import Task_list from "./components/Task_list";
import Nav from "./components/Nav";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios
      .get("http://localhost:8000/api/tasks")
      .then((res) => setTasks(res.data));
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
      status: newStatus,
    });
    fetchData();
    // const updatedTasks = tasks.map((task) => {
    //   if (task._id === taskId) {
    //     return { ...task, status: newStatus };
    //   }
    //   return task;
    // });
    // setTasks(updatedTasks);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
    fetchData();
    // const updatedTasks = tasks.filter((task) => task._id !== taskId);
    // setTasks(updatedTasks);
  };

  const updateTaskTitle = async (taskId, newTitle) => {
    await axios.put(`http://localhost:8000/api/tasks/${taskId}`, {
      title: newTitle,
    });
    fetchData();
    // const updatedTasks = tasks.map((task) => {
    //   if (task.id === taskId) {
    //     return { ...task, title: newTitle };
    //   }
    //   return task;
    // });
    // setTasks(updatedTasks);
  };

  return (
    <>
      <div className="main-container">
        <Nav />
        <div className="mt-1 flex gap-10 p-5">
          <AddTaskForm addTask={addTask} fetchData={fetchData} />
          <Task_list
            tasks={tasks}
            changeTaskStatus={changeTaskStatus}
            deleteTask={deleteTask}
            updateTaskTitle={updateTaskTitle}
          />
        </div>
      </div>
    </>
  );
}

export default App;
