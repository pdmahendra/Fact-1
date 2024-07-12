var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Inventory from "../models/Inventory.js";
import Alerts from "../models/Alerts.js";
export const addItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, quantity, price, min_limit, image_url } = req.body;
        if (!name || !quantity || !price || min_limit || image_url) {
            return res.status(400).json({ error: "Please enter all fields" });
        }
        const item = yield Inventory.create({
            name,
            quantity,
            price,
            min_limit,
            image_url,
        });
        return res.status(201).json({ item });
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
export const updateItemQuantity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { item_id, quantity, user_id } = req.body;
        if (!item_id || !quantity) {
            return res.status(400).json({ error: "Please provide all fields" });
        }
        const item = yield Inventory.findByIdAndUpdate(item_id, {
            quantity: quantity,
        });
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        if (item.quantity < item.min_limit) {
            yield Alerts.create({
                message: "Items is less than minimum limit",
                item: item._id,
                severienity: "mid",
            });
        }
        return res.status(200).json({ message: "Item Quantity updated" });
    }
    catch (error) {
        return res.status(400).json({ message: "Error occured" });
    }
});
