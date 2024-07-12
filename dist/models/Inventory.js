import mongoose from "mongoose";
import "dotenv/config";
export var InventoryType;
(function (InventoryType) {
    InventoryType["Raw"] = "raw";
    InventoryType["Cutting"] = "cutting";
    InventoryType["Ready"] = "ready";
})(InventoryType || (InventoryType = {}));
const InventorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    price: {
        type: Number,
    },
    min_limit: {
        type: Number,
    },
    image_url: {
        type: String,
    },
});
export default mongoose.model("Inventory", InventorySchema);
