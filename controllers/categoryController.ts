import { Request, Response } from "express"

import CategoryService from "../services/categoryService.js"

export async function findAllCategory(_: Request, res: Response) {
  const categories = await CategoryService.findAll()

  res.json({ categories })
}

export async function createOneCategory(req: Request, res: Response) {
  const newCategory = req.body
  const category = await CategoryService.createOne(newCategory)

  res.status(201).json({ category })
}

export default {
  findAllCategory,
  createOneCategory,
}
