import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name: String,
    // one to one you should use unique = true
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category",
    },
    // one to many
    sizes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Size",
        },
    ],
});
export default mongoose.model("Product", ProductSchema);
