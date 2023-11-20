import express from "express"
import mongoose, { ObjectId } from "mongoose"
import passport from "passport"
import "dotenv/config"

import itemsRoute from "./routes/itemsRoute"
import productsRoute from "./routes/productsRoute"
import categoryRoute from "./routes/categoryRoute"
import userRoute from "./routes/userRoute"
import Size from "./models/Size"
import Order from "./models/Order"
import { loggingMiddleware } from "./middlewares/logging"
import { apiErrorHandler } from "./middlewares/error"
import { routeNotFound } from "./middlewares/routeNotFound"
import OrderItem from "./models/OrderItem"
import ProductService from "./services/productsService"
import { checkAuth } from "./middlewares/checkAuth"
import { loginWithGoogle } from "./middlewares/loginWithGoogle"

const PORT = 8080
const app = express()

app.use(express.json())

app.use(passport.initialize())
passport.use(loginWithGoogle())

// TODO: Validate .env using Zod
const mongoURL = process.env.DB_URL as string
mongoose.connect(mongoURL).then(() => console.log("Connected!"))

app.get("/hello", loggingMiddleware, (_, res) => {
  res.json({ msg: "hello, from Express.js!" })
})

app.use("/api/v1/items", itemsRoute)
app.use("/api/v1/products", productsRoute)
app.use("/api/v1/categories", categoryRoute)
app.use("/api/v1/users", userRoute)

app.get("/api/v1/protected", checkAuth, (req, res) => {
  res.json({ items: [1, 2, 3, 4, 5] })
})

// TODO: MOVE ALL THE BELOW HANLDERS TO THEIR CORRESPONDING FILE
app.post("/api/v1/sizes", (req, res) => {
  const size = new Size(req.body)
  size.save()
  res.status(201).json({ message: "size is created", size })
})

// TODO: talk about accessing specific user orders
app.get("/api/v1/orders/:userId", async (req, res) => {
  const orderItems = await OrderItem.find()
    .populate("productId")
    .populate("orderId")

  res.status(201).json({ orderItems })
})
// Admin getting orders
app.get("/api/v1/orders", async (req, res) => {
  const orderItems = await OrderItem.find()
    .populate("productId")
    .populate("orderId")

  res.status(201).json({ orderItems })
})

app.post("/api/v1/checkout", async (req, res) => {
  const {
    name,
    products,
  }: {
    name: string
    products: {
      id: string
      quantity: number
    }[]
  } = req.body
  const order = new Order({ name })
  await order.save()

  const orderId = order._id
  console.log("orderId:", orderId)

  const orderItems: { _id: ObjectId; quantity: number }[] = []
  await Promise.all(
    products.map((product) => {
      const orderItem = new OrderItem({
        orderId,
        productId: product.id,
        quantity: product.quantity,
      })
      orderItem.save()
      orderItems.push({ _id: product.id, quantity: orderItem.quantity })
    })
  )

  console.log("orderItems:", orderItems)
  const sum = await ProductService.getTotalPrice(orderItems)
  console.log("sum:", sum)

  res.status(201).json({ message: "order is created", order })
})

app.use(apiErrorHandler)
app.use(routeNotFound)

app.listen(PORT, () => {
  console.log(`👀 app is running at localhost:${PORT}`)
})
