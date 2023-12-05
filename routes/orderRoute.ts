import express from "express";
import OrderController from "../controllers/orderController";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/", OrderController.getAllOrder);
router.get("/:userId", OrderController.getOrderItemsByUserId);
router.get("/:userId", checkAuth, OrderController.getOrdersByUserId);

export default router;
