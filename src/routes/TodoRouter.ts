import { addTask, addTask2, updateStatus1, updateStatus2, deleteTask1, deleteTask2 } from "../controllers/TodoControllers.js";

import express from "express";
const router = express.Router();

router.post("/addTask", addTask).put("/updateStatus1", updateStatus1).delete("/deleteTask1", deleteTask1);
router.post("/addTask2", addTask2).put("/updateStatus2", updateStatus2).delete("/deleteTask2", deleteTask2);

export default router;
