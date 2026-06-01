const express = require("express");
const router = express.Router();

const { createTask, listTasks, updateTask } = require("../controllers/taskController");

router.get("/", listTasks);
router.post("/", createTask);
router.put("/:id", updateTask);

module.exports = router;