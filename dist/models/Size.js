import mongoose from "mongoose";
const Schema = mongoose.Schema;
const SizeSchema = new Schema({
    name: String,
});
export default mongoose.model("Size", SizeSchema);
