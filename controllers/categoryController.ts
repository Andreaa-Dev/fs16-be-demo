import { Request, Response } from "express";

import CategoryService from "../services/categoryService";

export async function findAllCategory(_: Request, res: Response) {
  const categories = await CategoryService.findAll();

  res.json({ categories });
}

export async function createOneCategory(req: Request, res: Response) {
  const category = await CategoryService.createOne(req.body);

  res.status(201).json({ category });
}

export default {
  findAllCategory,
  createOneCategory,
};
