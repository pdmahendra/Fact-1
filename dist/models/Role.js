import mongoose from "mongoose";
import "dotenv/config";
import { UserType } from "./User.js";
const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: Object.values(UserType),
        default: UserType.Worker,
    },
    permissions: [
        {
            type: String,
        },
    ],
});
export default mongoose.model("Role", RoleSchema);
