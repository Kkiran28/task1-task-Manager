const express = require("express");
const router = express.Router();

const {
  createTask,
} = require("../controllers/taskController");

console.log("taskRoutes loaded");

console.log("createTask =", createTask);
router.post("/", createTask);

module.exports = router;