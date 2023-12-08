import express from "express";
import OrderController from "../controllers/orderController";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.post("/", checkAuth, OrderController.createOrder);
router.get("/", OrderController.getAllOrder);
// router.get("/:userId", OrderController.getOrderItemsByUserId);
router.get("/:userId", checkAuth, OrderController.getOrdersByUserId);

export default router;
