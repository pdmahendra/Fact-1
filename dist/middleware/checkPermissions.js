var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Role from "../models/Role.js";
import User from "../models/User.js";
export const checkPermissions = (permission) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield User.findById(req.body.userId).lean();
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const role = yield Role.findOne({ for: user.userType }).lean();
            if (!role) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            if (!role.permissions.includes(permission)) {
                return res
                    .status(401)
                    .json({ error: "You don't have permission for that" });
            }
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    });
};
