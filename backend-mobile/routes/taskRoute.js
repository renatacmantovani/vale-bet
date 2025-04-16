const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController.js");
const WithAuth = require('../middlewares/auth');

router.get("/tasks",taskController.getAllTasks);
router.post("/tasks", WithAuth,taskController.createTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.put("/tasks/:id", taskController.editTask);

module.exports = router;