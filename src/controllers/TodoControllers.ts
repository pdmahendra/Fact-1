import Todo1 from "../models/Todo1.js";
import Todo2 from "../models/Todo2.js";
import { Request, Response } from "express";
export const addTask = async (req: Request, res: Response) => {
  try {
    const { title, description, user_id } = req.body;
    const task = await Todo1.create({
      title,
      description,
      status: false,
      user: user_id,
    });

    return res.status(201).json({ task });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const addTask2 = async (req: Request, res: Response) => {
  try {
    const { title, description, user_id } = req.body;
    const task = await Todo2.create({
      title,
      description,
      status: false,
      user: user_id,
    });

    return res.status(201).json({ task });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateStatus1 = async (req: Request, res: Response) => {
  try {
    const { user_id, task_id } = req.body;
    const updatedTask = await Todo1.findByIdAndUpdate(task_id, {
      status: true,
    });
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateStatus2 = async (req: Request, res: Response) => {
  try {
    const { user_id, task_id } = req.body;
    const updatedTask = await Todo2.findByIdAndUpdate(task_id, {
      status: true,
    });
    return res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask1 = async (req: Request, res: Response) => {
  try {
    const { task_id } = req.body;
    await Todo1.findByIdAndDelete(task_id);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask2 = async (req: Request, res: Response) => {
  try {
    const { task_id } = req.body;
    await Todo2.findByIdAndDelete(task_id);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
