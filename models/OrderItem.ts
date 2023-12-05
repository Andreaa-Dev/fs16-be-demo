import mongoose from "mongoose";

const Schema = mongoose.Schema;

// productOrder
// const OrderItemSchema = new Schema({
//   orderId: {
//     type: Schema.Types.ObjectId,
//     ref: "Order",
//   },
//   productId: {
//     type: Schema.Types.ObjectId,
//     ref: "Product",
//   },
//   quantity: Number,
// });

// new schema
const OrderItemSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: Number,
});

export default mongoose.model("OrderItem", OrderItemSchema);
