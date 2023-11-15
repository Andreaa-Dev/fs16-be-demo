var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import itemsRoute from "./routes/itemsRoute.js";
import productsRoute from "./routes/productsRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import userRoute from "./routes/userRoute.js";
import Size from "./models/Size.js";
import Order from "./models/Order.js";
import { loggingMiddleware } from "./middlewares/logging.js";
import { apiErrorHandler } from "./middlewares/error.js";
import { routeNotFound } from "./middlewares/routeNotFound.js";
import OrderItem from "./models/OrderItem.js";
import ProductService from "./services/productsService.js";
import { checkAuth } from "./middlewares/checkAuth.js";
const PORT = 8080;
const app = express();
app.use(express.json());
// TODO: Validate .env using Zod
const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL).then(() => console.log("Connected!"));
app.get("/hello", loggingMiddleware, (_, res) => {
    res.json({ msg: "hello, from Express.js!" });
});
app.use("/api/v1/items", itemsRoute);
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/users", userRoute);
app.get("/api/v1/protected", checkAuth, (req, res) => {
    res.json({ items: [1, 2, 3, 4, 5] });
});
// TODO: MOVE ALL THE BELOW HANLDERS TO THEIR CORRESPONDING FILE
app.post("/api/v1/sizes", (req, res) => {
    const size = new Size(req.body);
    size.save();
    res.status(201).json({ message: "size is created", size });
});
// TODO: talk about accessing specific user orders
app.get("/api/v1/orders/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItems = yield OrderItem.find()
        .populate("productId")
        .populate("orderId");
    res.status(201).json({ orderItems });
}));
// Admin getting orders
app.get("/api/v1/orders", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderItems = yield OrderItem.find()
        .populate("productId")
        .populate("orderId");
    res.status(201).json({ orderItems });
}));
app.post("/api/v1/checkout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, products, } = req.body;
    const order = new Order({ name });
    yield order.save();
    const orderId = order._id;
    console.log("orderId:", orderId);
    const orderItems = [];
    yield Promise.all(products.map((product) => {
        const orderItem = new OrderItem({
            orderId,
            productId: product.id,
            quantity: product.quantity,
        });
        orderItem.save();
        orderItems.push({ _id: product.id, quantity: orderItem.quantity });
    }));
    console.log("orderItems:", orderItems);
    const sum = yield ProductService.getTotalPrice(orderItems);
    console.log("sum:", sum);
    res.status(201).json({ message: "order is created", order });
}));
app.use(apiErrorHandler);
app.use(routeNotFound);
app.listen(PORT, () => {
    console.log(`👀 app is running at localhost:${PORT}`);
});
