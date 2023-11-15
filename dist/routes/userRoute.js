import express from "express";
import UserController from "../controllers/userController.js";
const router = express.Router();
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.delete("/", UserController.deleteAll);
export default router;
