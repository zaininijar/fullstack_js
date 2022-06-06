import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Products.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getMahasiswa, Register, Login, Logout } from "../controllers/Mahasiswa.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

//route mahasiswa
router.get("/mahasiswa", verifyToken, getMahasiswa);
router.post("/mahasiswa", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

//route product
router.get("/products", getAllProducts);
router.get("/product/:id", getProductById);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
