import { NextFunction, Request, Response } from "express";

import Size from "../models/Size";

export async function createSize(req: Request, res: Response) {
  const size = new Size(req.body);
  size.save();
  res.status(201).json({ message: "size is created", size });
}

export default { createSize };
