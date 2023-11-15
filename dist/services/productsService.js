var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from "mongoose";
import ProductRepo from "../models/Product.js";
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield ProductRepo.find()
            .populate("category")
            .populate("sizes");
        return products;
    });
}
function findOne(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = new mongoose.Types.ObjectId(productId);
        const product = yield ProductRepo.findById(id);
        return product;
    });
}
function createOne(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = new ProductRepo(product);
        return yield newProduct.save();
    });
}
function getTotalPrice(orderItemsInput) {
    return __awaiter(this, void 0, void 0, function* () {
        const inputIds = orderItemsInput.map((item) => item._id);
        const products = yield ProductRepo.find({ _id: inputIds });
        const sum = products.reduce((acc, product) => {
            const inputTargetItem = orderItemsInput.find((input) => product._id.equals(input._id));
            if (inputTargetItem) {
                return acc + inputTargetItem.quantity * product.price;
            }
            return acc;
        }, 0);
        return sum;
    });
}
export default {
    findOne,
    findAll,
    createOne,
    getTotalPrice,
};
