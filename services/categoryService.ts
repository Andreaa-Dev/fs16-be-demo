import CategoryRepo from "../models/Category"
import { Category } from "../types/products"

async function findAll() {
  const categories = await CategoryRepo.find().exec()

  return categories
}

async function createOne(category: Category) {
  const newCategory = new CategoryRepo(category)
  return await newCategory.save()
}

export default {
  findAll,
  createOne,
}
