import express from "express"
import passport from "passport"

import UserController from "../controllers/userController"
import { checkAuth } from "../middlewares/checkAuth"
import { checkRoles } from "../middlewares/checkRoles"
import { ROLE } from "../common/auth"
import { checkPermission } from "../middlewares/checkPermission"
import { WithUserRequest } from "../types/users"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/signup", UserController.signup)
router.post("/login", UserController.login)
router.post(
  "/login-google",
  passport.authenticate("google-id-token", { session: false }),
  (req: any, res) => {
    const user = req.user

    if (user) {
      const payload = {
        userId: user._id,
        email: user.email,
        role: user.role,
        // TODO: GET THIS FROM YOUR DB
        permissions: ["USERS_DELETE_ONE"],
      }
      const accessToken = jwt.sign(
        payload,
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "1h",
        }
      )
      res.json({
        accessToken,
      })
    }
  }
)

router.get("/", UserController.findAll)
router.delete(
  "/:userId",
  checkAuth,
  checkRoles(ROLE.ADMIN, ROLE.USER),
  // Extra if you have permission
  checkPermission("USERS_DELETE_ONE"),
  UserController.deleteOne
)

export default router
