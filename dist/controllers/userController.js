var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserSevice from "../services/userService.js";
import UserRepo from "../models/User.js";
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const user = yield UserSevice.createOne({ name, email, password });
        if (!user) {
            res.status(400).json({
                message: "User exists",
                user: null,
            });
            return;
        }
        res.status(201).json({
            message: "user created",
            user,
        });
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, email } = req.body;
        const login = yield UserSevice.login(email, password);
        if (!login.status) {
            // TODO throw API error
            res.status(400).json({ accessToken: null, message: "Bad credentials" });
            return;
        }
        res.json({ message: login.message, accessToken: login.accessToken });
    });
}
function deleteAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield UserRepo.deleteMany();
        res.status(201).json({
            message: "users are deleted",
        });
    });
}
export default { signup, deleteAll, login };
