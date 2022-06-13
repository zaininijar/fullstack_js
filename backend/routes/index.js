import express from "express";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getMahasiswa, Register, Login, Logout } from "../controllers/Mahasiswa.js";
import { UseAuth } from "../controllers/Profile.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

//route mahasiswa
router.get("/mahasiswa", verifyToken, getMahasiswa);
router.post("/mahasiswa", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);   

//profile
router.get("/useauth", UseAuth);

export default router;
