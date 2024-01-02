import mongoose from "mongoose";
import app from "./app";

const PORT = 8080;

mongoose.connect(process.env.DB_URL as string);
app.listen(PORT, () => {
  console.log(`👀 app is running at localhost:${PORT}`);
});
