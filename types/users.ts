import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

import { ROLE } from "../common/auth.js"

export interface DecodedUser extends JwtPayload {
  userId: string
  email: string
  role: Role
}

export type Role = keyof typeof ROLE

export type User = {
  _id: string
  name: string
  email: string
  password: string
  role: Role
}

export interface WithAuthRequest extends Request {
  decodedUser?: DecodedUser
}
export interface WithUserRequest extends Request {
  user?: User
}
