import mongoose from "mongoose"
import ProductRepo from "../models/Product"
import { Product } from "../types/products"

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

async function getTotalPrice(
  orderItemsInput: {
    _id: mongoose.Types.ObjectId
    quantity: number
  }[]
): Promise<number> {
  const inputIds = orderItemsInput.map((item) => item._id)
  const products = await ProductRepo.find({ _id: inputIds })

  const sum = products.reduce((acc, product) => {
    const inputTargetItem = orderItemsInput.find((input) =>
      product._id.equals(input._id)
    )

    if (inputTargetItem) {
      return acc + inputTargetItem.quantity * product.price
    }
    return acc
  }, 0)
  return sum
}

export default {
  findOne,
  findAll,
  createOne,
  getTotalPrice,
}
