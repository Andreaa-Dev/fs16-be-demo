import { ApiError } from "../errors/ApiError.js";
export function checkRoles(...roles) {
    return (req, res, next) => {
        const user = req.decodedUser;
        const hasMatchedRole = user && roles.includes(user.role);
        if (!hasMatchedRole) {
            next(ApiError.forbidden("GET OUT!!!!"));
            return;
        }
        next();
    };
}
