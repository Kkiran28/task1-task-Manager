const express = require("express");
const router = express.Router();

const { createTask, listTasks } = require("../controllers/taskController");

router.get("/", listTasks);
router.post("/", createTask);

module.exports = router;