import express from "express";

const router = express.Router();
import { Request, Response } from "express";
import { checkPermissions } from "../middleware/checkPermissions.js";
import authenticate from "../middleware/authentication.js";

router.get("/", authenticate, checkPermissions("read"), (req, res) => {
  res.send("Hello from TestRouter");
});
