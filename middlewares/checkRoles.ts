import { NextFunction, Request, Response } from "express"
import { Role, WithAuthRequest } from "../types/users.js"
import { ApiError } from "../errors/ApiError.js"

export function checkRoles(...roles: Role[]) {
  return (req: WithAuthRequest, res: Response, next: NextFunction) => {
    const user = req.decodedUser
    const hasMatchedRole = user && roles.includes(user.role)
    if (!hasMatchedRole) {
      next(ApiError.forbidden("GET OUT!!!!"))
      return
    }

    next()
  }
}
