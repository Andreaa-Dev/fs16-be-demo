import { Request, Response } from "express";

import OrderItem from "../models/OrderItem";
import Order from "../models/Order";

export async function getAllOrder(req: Request, res: Response) {
  const orderItems = await OrderItem.find()
    .populate("productId")
    .populate("orderId");

  res.status(201).json({ orderItems });
}

export async function getOrderItemsByUserId(req: Request, res: Response) {
  // can get userId by params but the order schema does not have user id
  const orderItems = await OrderItem.find()
    .populate("productId")
    .populate("orderId");

  res.status(201).json({ orderItems });
}

export async function getOrdersByUserId(req: Request, res: Response) {
  const userId = req.params.userId;
  const foundOrders = await Order.find({ userId: userId }).populate(
    "orderItems"
  );
  return res.status(200).json({ foundOrders });
}

export default { getAllOrder, getOrderItemsByUserId, getOrdersByUserId };
