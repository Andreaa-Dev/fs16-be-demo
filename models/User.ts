import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "USER",
  },
  isLogInWithGoogle: {
    type: Boolean,
    default: false,
  },
  // ref to orderId
});

export default mongoose.model("User", UserSchema);
