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

const listTasks = (_req, res) => {
  const tasks = readTasks();

  return res.status(200).json(tasks);
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

  return res.status(201).json(newTask);
};

const updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  const tasks = readTasks();
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  const task = tasks[taskIndex];
  const updatedTask = {
    ...task,
    title: title ?? task.title,
    description: description ?? task.description,
    dueDate: dueDate ?? task.dueDate,
    completed: completed ?? task.completed,
  };

  tasks[taskIndex] = updatedTask;
  saveTasks(tasks);

  return res.status(200).json(updatedTask);
};

module.exports = {
  createTask,
  listTasks,
  updateTask,
};