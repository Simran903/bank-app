import { Router } from "express";
import { getUserBalance, signIn, signOut, signUp, updatePassword, updateProfilePicture } from "../controllers/user.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const router = Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").post(verifyJWT, signOut);
router.route("/update-password").post(verifyJWT, updatePassword)
router.route("/profile-picture").post(verifyJWT, upload.single('profilePicture'), updateProfilePicture);
router.route("/get-balance").post(verifyJWT, getUserBalance)


export default router;
