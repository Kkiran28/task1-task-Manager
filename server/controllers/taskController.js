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

// GET ALL TASKS
const listTasks = (_req, res) => {
  try {
    const tasks = readTasks();

    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};

// CREATE TASK
const createTask = (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        message: "Invalid due date",
      });
    }

    const tasks = readTasks();

    const newTask = {
      id: uuid(),
      title: title.trim(),
      description: description || "",
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date(),
    };

    tasks.unshift(newTask);

    saveTasks(tasks);

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task",
      error: error.message,
    });
  }
};

// UPDATE TASK
const updateTask = (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, completed } = req.body;

    const tasks = readTasks();

    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Validation
    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }

    if (dueDate && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        message: "Invalid due date",
      });
    }

    if (
      completed !== undefined &&
      typeof completed !== "boolean"
    ) {
      return res.status(400).json({
        message: "Completed must be true or false",
      });
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

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update task",
      error: error.message,
    });
  }
};

// DELETE TASK
const deleteTask = (req, res) => {
  try {
    const { id } = req.params;

    const tasks = readTasks();

    const nextTasks = tasks.filter((task) => task.id !== id);

    if (nextTasks.length === tasks.length) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    saveTasks(nextTasks);

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
};