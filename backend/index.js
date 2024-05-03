const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Task = require("./model/task");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Middleware
app.use(bodyParser.json());

// Routes
app.post("/api/tasks", async (req, res) => {
  try {
    const { title, status } = req.body;
    const newTask = new Task({ title, status });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Could not create task" });
  }
});

app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, status },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Could not update task" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Could not delete task" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});
