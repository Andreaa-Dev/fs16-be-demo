var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import UserRepo from "../models/User.js";
import jwt from "jsonwebtoken";
export function findOneByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return UserRepo.findOne({ email });
    });
}
export function createOne({ password, email, name, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const userFromDB = yield findOneByEmail(email);
        if (userFromDB) {
            return null;
        }
        const user = new UserRepo({
            name,
            email,
            password: hashedPassword,
        });
        yield user.save();
        const userWithoutPass = {
            name: user.name,
            email: user.email,
            role: user.role,
        };
        return userWithoutPass;
    });
}
export function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield findOneByEmail(email);
        if (!user) {
            return {
                message: "bad credentials",
                status: false,
                accessToken: null,
            };
        }
        const hashedPassword = user.password;
        const isValid = bcrypt.compareSync(password, hashedPassword);
        if (!isValid) {
            return {
                message: "bad credentials",
                status: false,
                accessToken: null,
            };
        }
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });
        return {
            message: "valid credentials",
            status: true,
            accessToken,
        };
    });
}
export default {
    createOne,
    login,
    findOneByEmail,
};
