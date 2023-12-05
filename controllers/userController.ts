import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import UserService from "../services/userService";
import UserRepo from "../models/User";

async function signup(req: Request, res: Response) {
  const { name, email, password } = req.body;

  const user = await UserService.createOne({ name, email, password });

  if (!user) {
    res.status(400).json({
      message: "User exists",
      user: null,
    });
    return;
  }

  res.status(201).json({
    message: "user created",
    user,
  });
}

async function login(req: Request, res: Response) {
  const { password, email } = req.body;
  const foundUser = await UserService.findOneByEmail(email);
  if (!foundUser) {
    return res
      .status(400)
      .json({ message: `Cant find user with email: ${email}` });
  }
  if (foundUser.isLogInWithGoogle) {
    return res.status(400).json({ message: "please log in with Google" });
  }

  const login = await UserService.login(email, password);

  if (!login.status) {
    // TODO throw API error
    return res.status(400).json({ message: "Bad credentials" });
  }

  res.json({
    message: login.message,
    accessToken: login.accessToken,
    user: login.user,
  });
}

async function logInWithGoogle(req: any, res: Response) {
  const user = req.user;
  if (user) {
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
      // TODO: GET THIS FROM YOUR DB
      permissions: ["USERS_DELETE_ONE"],
    };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
    res.json({
      accessToken,
      user,
    });
  }
}
async function deleteAll(req: Request, res: Response) {
  await UserService.deleteAll();
  res.status(201).json({
    message: "users are deleted",
  });
}
async function deleteOne(req: Request, res: Response) {
  const userId = req.params.userId;
  // await UserSevice.deleteOne(userId)
  res.status(201).json({
    message: `user ${userId} is deleted`,
  });
}
async function findAll(req: Request, res: Response) {
  const users = await UserService.findAll();
  res.status(201).json({
    users,
  });
}

export default {
  signup,
  deleteAll,
  deleteOne,
  login,
  findAll,
  logInWithGoogle,
};
