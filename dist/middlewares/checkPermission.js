import { ApiError } from "../errors/ApiError.js";
export function checkPermission(...permissions) {
    return (req, res, next) => {
        const user = req.decodedUser;
        const hasMatchedPermission = user &&
            permissions.find((permission) => permission.includes(user.permissions));
        if (!hasMatchedPermission) {
            next(ApiError.forbidden("GET OUT WRONG PERMISSION!!!!"));
            return;
        }
        next();
    };
}
