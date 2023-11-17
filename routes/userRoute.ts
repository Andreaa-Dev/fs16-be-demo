import express from "express"

import UserController from "../controllers/userController.js"
import { checkAuth } from "../middlewares/checkAuth.js"
import { checkRoles } from "../middlewares/checkRoles.js"
import { ROLE } from "../common/auth.js"
import { checkPermission } from "../middlewares/checkPermission.js"

const router = express.Router()

router.post("/signup", UserController.signup)
router.post("/login", UserController.login)

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
