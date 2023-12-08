import { NextFunction, Request, Response } from "express";

import SizeService from "../services/sizeService";

export async function createSize(req: Request, res: Response) {
  const size = SizeService.createOne(req.body);
  res.status(201).json({ size });
}

export default { createSize };
