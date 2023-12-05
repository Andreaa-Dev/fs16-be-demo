import express from "express";
import SizeController from "../controllers/sizeController";

const router = express.Router();

router.post("/", SizeController.createSize);

export default router;
