import Role from "../models/Role.js";
import User from "../models/User.js";
import { Request, Response, NextFunction } from "express";
export const checkPermissions = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.body.userId).lean();
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      const role = await Role.findOne({ for: user.userType }).lean();
      if (!role) {
        return res.status(401).json({ error: "Unauthorized" });
      }
      if (!role.permissions.includes(permission)) {
        return res
          .status(401)
          .json({ error: "You don't have permission for that" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  };
};
