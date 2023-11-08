import mongoose, { ObjectId } from "mongoose"
import ProductRepo from "../models/Product.js"
import { Product } from "../types/products.js"

async function findAll() {
  const products = await ProductRepo.find()
    .populate("category")
    .populate("sizes")

  return products
}

async function findOne(productId: string) {
  const id = new mongoose.Types.ObjectId(productId)
  const product = await ProductRepo.findById(id)

  return product
}

async function createOne(product: Product) {
  const newProduct = new ProductRepo(product)

  return await newProduct.save()
}

export default {
  findOne,
  findAll,
  createOne,
}
