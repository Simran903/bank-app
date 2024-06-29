import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").post(verifyJWT, signOut);

export default router;
