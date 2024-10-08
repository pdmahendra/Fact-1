import User from "../models/User.js";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerC = async (req: Request, res: Response) => {
  try {
    const { name, username, password, phoneNo, userType } = req.body;
    // console.log(req.body);
    if (!name || !username || !password || !phoneNo || !userType) {
      return res.status(400).json({ error: "Please enter all fields" });
    }

    const existing = await User.findOne({ username }).lean();
    if (existing) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      password: hashedPassword,

      phoneNo,
      userType,
    });
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

    return res.status(201).json({ user, token });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const loginC = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Please enter all fields" });
    }

    const user = await User.findOne({ username }).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // if (user.firstTime) {
    //   user.firstTime = false;
    //   await user.save();
    // }

    const isPsswordMatch = await bcrypt.compare(password, user.password);

    if (!isPsswordMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );
    return res.json({
      user: {
        _id: user._id,
        name: user.name,

        phoneNo: user.phoneNo,
        userType: user.userType,
        username: user.username,
      },
      token,
    });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
