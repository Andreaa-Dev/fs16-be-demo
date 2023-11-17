import { NextFunction, Request, Response } from "express"
import { Role, WithAuthRequest } from "../types/users.js"
import { ApiError } from "../errors/ApiError.js"
import { Permission } from "../common/auth.js"

export function checkPermission(...permissions: Permission[]) {
  return (req: WithAuthRequest, res: Response, next: NextFunction) => {
    const user = req.decodedUser

    const hasMatchedPermission =
      user &&
      permissions.find((permission) => permission.includes(user.permissions))

    if (!hasMatchedPermission) {
      next(ApiError.forbidden("GET OUT WRONG PERMISSION!!!!"))
      return
    }

    next()
  }
}
