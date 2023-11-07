import mongoose from "mongoose";
const Schema = mongoose.Schema;
const OrdeItemSchema = new Schema({
    orderId: {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: Number,
});
export default mongoose.model("OrderItem", OrdeItemSchema);
