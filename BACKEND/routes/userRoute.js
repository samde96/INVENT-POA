import express from "express"
import { registerUser, loginUser, logout, getUser, loginStatus, updateUSer, changePassword, forgotPassword, resetPassword } from "../controllers/userController.js"
import protect from "../middlewares/AuthMiddleware.js";



const router = express.Router();


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/updateuser", protect, updateUSer );
router.patch("/changepassword", protect, changePassword );
router.post("/forgotpassword", forgotPassword );
router.put("/resetpassword/:resetToken", resetPassword );




export default router;
