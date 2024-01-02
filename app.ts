import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import "dotenv/config";
import cors from "cors";

import itemsRoute from "./routes/itemsRoute";
import productsRoute from "./routes/productsRoute";
import categoryRoute from "./routes/categoryRoute";
import userRoute from "./routes/userRoute";
import sizeRoute from "./routes/sizeRoute";
import orderRoute from "./routes/orderRoute";
import { loggingMiddleware } from "./middlewares/logging";
import { apiErrorHandler } from "./middlewares/error";
import { routeNotFound } from "./middlewares/routeNotFound";
import { checkAuth } from "./middlewares/checkAuth";
import { loginWithGoogle } from "./middlewares/loginWithGoogle";
import Order from "./models/Order";
import ProductService from "./services/productsService";
import OrderItem from "./models/OrderItem";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(loginWithGoogle());

// TODO: Validate .env using Zod

app.use("/api/v1/items", itemsRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/sizes", sizeRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/orders", orderRoute);

// app.post("/api/v1/checkout", async (req, res) => {
//   const {
//     name,
//     products,
//   }: {
//     name: string;
//     products: {
//       id: string;
//       quantity: number;
//     }[];
//   } = req.body;
//   const order = new Order({ name });
//   await order.save();

//   const orderId = order._id;
//   console.log("orderId:", orderId);

//   const orderItems: { _id: ObjectId; quantity: number }[] = [];
//   await Promise.all(
//     products.map((product) => {
//       const orderItem = new OrderItem({
//         orderId,
//         productId: product.id,
//         quantity: product.quantity,
//       });
//       orderItem.save();
//       orderItems.push({ _id: product.id, quantity: orderItem.quantity });
//     })
//   );

//   console.log("orderItems:", orderItems);
//   const sum = await ProductService.getTotalPrice(orderItems);
//   console.log("sum:", sum);

//   res.status(201).json({ message: "order is created", order });
// });

app.get("/hello", loggingMiddleware, (_, res) => {
  res.json({ msg: "hello, from Express.js!" });
});

app.get("/api/v1/protected", checkAuth, (req, res) => {
  res.json({ items: [1, 2, 3, 4, 5] });
});

app.use(apiErrorHandler);
app.use(routeNotFound);

export default app;
