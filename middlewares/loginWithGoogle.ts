import GoogleTokenStrategy from "passport-google-id-token"
import "dotenv/config"

import UserRepo from "../models/User"
import { ApiError } from "../errors/ApiError"

const GOOGLE_CLIENT_ID =
  "601029235840-7g4tl5ibpel48pbml0egcb7c511pmlge.apps.googleusercontent.com"

export const loginWithGoogle = () => {
  return new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
    },
    async function (parsedToken, googleId, done) {
      const email = parsedToken.payload.email
      try {
        let user = await UserRepo.findOne({ email })

        if (!user) {
          const newUser = new UserRepo({
            name: parsedToken.payload.name,
            email,
          })

          await newUser.save()
          user = newUser
        }

        done(false, user)
      } catch (error) {
        return done(ApiError.forbidden("google authentication failed"))
      }
    }
  )
}
