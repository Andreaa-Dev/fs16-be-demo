import mongoose from "mongoose";

const Schema = mongoose.Schema;

// order: date
// const OrderSchema = new Schema({
//   name: String,
// });

// new order
const OrderSchema = new Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  // embed
  orderItems: [
    {
      type: Schema.Types.ObjectId,
      ref: "OrderItem",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // total
});

export default mongoose.model("Order", OrderSchema);
