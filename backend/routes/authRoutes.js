import express from "express";
import { register, verifyOTP, login} from "../controllers/authController.js";
import { logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";



const router=express.Router();

router.post("/register", register);

router.post("/verify-otp", verifyOTP);

router.post("/login",login);

router.post("/logout", protect, logout);

export default router;