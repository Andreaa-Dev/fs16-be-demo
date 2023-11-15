import bcrypt from "bcrypt"

import UserRepo from "../models/User.js"
import jwt from "jsonwebtoken"

export async function findOneByEmail(email: string) {
  return UserRepo.findOne({ email })
}
export async function createOne({
  password,
  email,
  name,
}: {
  password: string
  email: string
  name: string
}) {
  const hashedPassword = bcrypt.hashSync(password, 10)

  const userFromDB = await findOneByEmail(email)

  if (userFromDB) {
    return null
  }

  const user = new UserRepo({
    name,
    email,
    password: hashedPassword,
  })

  await user.save()

  const userWithoutPass = {
    name: user.name,
    email: user.email,
    role: user.role,
  }
  return userWithoutPass
}

export async function login(email: string, password: string) {
  const user = await findOneByEmail(email)

  if (!user) {
    return {
      message: "bad credentials",
      status: false,
      accessToken: null,
    }
  }

  const hashedPassword = user.password
  const isValid = bcrypt.compareSync(password, hashedPassword)

  if (!isValid) {
    return {
      message: "bad credentials",
      status: false,
      accessToken: null,
    }
  }

  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }
  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "1h",
  })

  return {
    message: "valid credentials",
    status: true,
    accessToken,
  }
}
export default {
  createOne,
  login,
  findOneByEmail,
}
