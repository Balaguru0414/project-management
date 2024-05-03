// insertTestData.js

const mongoose = require("mongoose");
const Task = require("./model/task");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/tasks", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Sample tasks data
const sampleTasks = [
  { title: "Task 1", status: "Pending" },
  { title: "Task 2", status: "InProgress" },
  { title: "Task 3", status: "Completed" },
];

// Function to insert sample tasks
const insertTestData = async () => {
  try {
    await Task.deleteMany(); // Clear existing data
    await Task.insertMany(sampleTasks); // Insert sample tasks
    console.log("Sample tasks inserted successfully");
    mongoose.connection.close(); // Close connection after insertion
  } catch (err) {
    console.error("Error inserting sample tasks:", err);
    mongoose.connection.close(); // Close connection in case of error
  }
};

// Run the function to insert sample tasks
insertTestData();
