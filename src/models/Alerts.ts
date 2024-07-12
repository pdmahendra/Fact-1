import mongoose from "mongoose";

interface AlertsSchema extends mongoose.Document {
  message: String;
  item: mongoose.Schema.Types.ObjectId;
  severienity: String;
}

const AlertsSchema = new mongoose.Schema<AlertsSchema>({
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

export default mongoose.model<AlertsSchema>("Alerts", AlertsSchema);
