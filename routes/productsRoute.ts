import express from "express";

import ProductController from "../controllers/productsController";
import { validateProduct } from "../middlewares/productValidate";

const router = express.Router();

// REST API
router.get("/", ProductController.findAllProduct);
router.get("/:productId", ProductController.findOneProduct);
router.post("/", validateProduct, ProductController.createOneProduct);
router.delete("/:productId", ProductController.findOneProduct);

export default router;
