import Inventory from "../models/Inventory.js";
import Alerts from "../models/Alerts.js";

import { Request, Response } from "express";

export const addItem = async (req: Request, res: Response) => {
  try {
    const { name, quantity, price, min_limit, image_url } = req.body;
    if (!name || !quantity || !price || min_limit || image_url) {
      return res.status(400).json({ error: "Please enter all fields" });
    }
    const item = await Inventory.create({
      name,
      quantity,
      price,
      min_limit,
      image_url,
    });
    return res.status(201).json({ item });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateItemQuantity = async (req: Request, res: Response) => {
  try {
    const { item_id, quantity, user_id } = req.body;
    if (!item_id || !quantity) {
      return res.status(400).json({ error: "Please provide all fields" });
    }
    const item = await Inventory.findByIdAndUpdate(item_id, {
      quantity: quantity,
    });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    if (item.quantity < item.min_limit) {
      await Alerts.create({
        message: "Items is less than minimum limit",
        item: item._id,
        severienity: "mid",
      });
    }
    return res.status(200).json({ message: "Item Quantity updated" });
  } catch (error: any) {
    return res.status(400).json({ message: "Error occured" });
  }
};
