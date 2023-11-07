var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import CategoryService from "../services/categoryService.js";
export function findAllCategory(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield CategoryService.findAll();
        res.json({ categories });
    });
}
export function createOneCategory(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = req.body;
        const category = yield CategoryService.createOne(newCategory);
        res.status(201).json({ category });
    });
}
export default {
    findAllCategory,
    createOneCategory,
};
