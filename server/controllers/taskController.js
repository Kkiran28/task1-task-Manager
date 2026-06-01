const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
};

const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

const createTask = (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  const tasks = readTasks();

  const newTask = {
    id: uuid(),
    title,
    description,
    dueDate,
    completed: false,
    createdAt: new Date(),
  };

  tasks.unshift(newTask);

  saveTasks(tasks);

  res.status(201).json(newTask);
};

module.exports = {
  createTask,
};