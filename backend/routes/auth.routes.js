import express from "express"
import { logOut, signUp ,Login} from "../controllers/auth.controllers.js"

const authRouter=express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/signin",Login)
authRouter.get("/logout",logOut)
export default authRouter