import jwt from "jsonwebtoken";
import { ApiError } from "../errors/ApiError.js";
export function checkAuth(req, _, next) {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        next(ApiError.forbidden("Token is missing"));
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.decodedUser = decoded;
        next();
    }
    catch (err) {
        next(ApiError.forbidden("Invalid token"));
    }
}
