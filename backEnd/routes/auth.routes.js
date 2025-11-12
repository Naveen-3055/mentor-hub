
import express from'express'
import { googleLogin, Login, logout, SignUp } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post("/signup",SignUp)
authRouter.post("/login",Login)
authRouter.get("/logout",logout)
authRouter.post('/googlelogin',googleLogin)

export default authRouter;
