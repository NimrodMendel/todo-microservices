import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Config } from "../config/config";

const login = async (req: Request, res: Response, next?: NextFunction) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials!" });
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(401).json({ massage: "Invalid credentials!" });
    }

    const token = jwt.sign({ id: user._id }, Config.jwt_secret!, {
      expiresIn: "1h",
    });

    res.status(200).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const register = async (req: Request, res: Response, next?: NextFunction) => {
  const { email, firstName, lastName, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with that email already exists!" });
    }

    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, Config.jwt_secret!, {
      expiresIn: "1h",
    });

    res.status(201).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { login, register };
