import mongoose from "mongoose";
const AlertsSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Needs an alert message"],
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
    },
    severienity: {
        type: String,
        default: "mid",
    },
});
export default mongoose.model("Alerts", AlertsSchema);
