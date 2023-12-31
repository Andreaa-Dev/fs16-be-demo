import express from "express"

import CategoryController from "../controllers/categoryController"

const router = express.Router()

router.get("/", CategoryController.findAllCategory)

router.post("/", CategoryController.createOneCategory)

export default router
