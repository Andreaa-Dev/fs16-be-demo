import { Size } from "../types/products";
import SizeRepo from "../models/Size";

async function createOne(size: Size) {
  const newSize = new SizeRepo(size);
  return await newSize.save();
}

export default { createOne };
