var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo1 from "../models/Todo1.js";
import Todo2 from "../models/Todo2.js";
export const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, user_id } = req.body;
        const task = yield Todo1.create({
            title,
            description,
            status: false,
            user: user_id,
        });
        return res.status(201).json({ task });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const addTask2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, user_id } = req.body;
        const task = yield Todo2.create({
            title,
            description,
            status: false,
            user: user_id,
        });
        return res.status(201).json({ task });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateStatus1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, task_id } = req.body;
        const updatedTask = yield Todo1.findByIdAndUpdate(task_id, {
            status: true,
        });
        return res.status(200).json({ message: "Updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
export const updateStatus2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, task_id } = req.body;
        const updatedTask = yield Todo2.findByIdAndUpdate(task_id, {
            status: true,
        });
        return res.status(200).json({ message: "Updated successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
export const deleteTask1 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.body;
        yield Todo1.findByIdAndDelete(task_id);
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
export const deleteTask2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.body;
        yield Todo2.findByIdAndDelete(task_id);
        return res.status(200).json({ message: "Deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});
