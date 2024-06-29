import { Router } from "express";
import { signIn, signOut, signUp, updatePassword } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").post(verifyJWT, signOut);
router.route("/update-password").post(verifyJWT, updatePassword)


export default router;
