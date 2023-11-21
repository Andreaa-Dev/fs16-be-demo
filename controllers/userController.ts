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
  const login = await UserService.login(email, password);

  if (!login.status) {
    // TODO throw API error
    res.status(400).json({ accessToken: null, message: "Bad credentials" });
    return;
  }

  res.json({ message: login.message, accessToken: login.accessToken });
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

export default { signup, deleteAll, deleteOne, login, findAll };
