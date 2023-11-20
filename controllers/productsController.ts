import { NextFunction, Request, Response } from "express"

import ProductsService from "../services/productsService"
import { ApiError } from "../errors/ApiError"

export async function findAllProduct(_: Request, res: Response) {
  const products = await ProductsService.findAll()

  res.json({ products })
}

export async function findOneProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const productId = req.params.productId
  const product = await ProductsService.findOne(productId)

  if (!product) {
    next(ApiError.resourceNotFound("Product not found."))
    return
  }

  res.json({ product })
}

export async function createOneProduct(req: Request, res: Response) {
  try {
    const newProduct = req.body
    const product = await ProductsService.createOne(newProduct)

    res.status(201).json({ product })
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = {}

      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message

        res.status(500).json({ erros: validationErrors })
        return
      }
    }
    res.status(500).json({ msg: "something went wrong" })
  }
}

export default {
  findOneProduct,
  findAllProduct,
  createOneProduct,
}
