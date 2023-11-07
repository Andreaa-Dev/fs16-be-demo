import CategoryRepo from "../models/Category.js"
import { Category } from "../types/products.js"

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
