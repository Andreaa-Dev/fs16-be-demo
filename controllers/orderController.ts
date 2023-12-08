import { Request, Response } from "express";

import OrderItem from "../models/OrderItem";
import OrderRepo from "../models/Order";
import { Order } from "../types/order";

export async function createOrder(req: Request, res: Response) {
  const decodedUser = (req as any).decodedUser;
  const userId = decodedUser.userId;

  // create orderItem
  const items: Order[] = req.body.orderItems.map(
    (order: any) => new OrderItem(order)
  );

  // orderItems: []
  // create(): save smt to database - array
  const orderItems = await OrderItem.create(items);
  // create orderItem => save database => push each orderItem into OrderItems
  const newOrder = new OrderRepo({ orderItems, userId });
  const order = await newOrder.save();
  res.status(201).json({ order });
}

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
  // get userId by token
  const foundOrders = await OrderRepo.find({ userId: userId }).populate(
    "orderItems"
  );
  return res.status(200).json({ foundOrders });
}

export default {
  createOrder,
  getAllOrder,
  getOrderItemsByUserId,
  getOrdersByUserId,
};
