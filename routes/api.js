import express from "express";
import { register, login, logout, refreshToken } from "../controllers/authController.js";
import { showUser } from "../controllers/userController.js"
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', verifyToken, logout);

// User routes
router.get('/user', verifyToken, showUser);

// Essay routes

export default router;