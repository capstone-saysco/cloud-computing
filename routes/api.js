import express from "express";
import { register, login, logout, refreshToken } from "../controllers/authController.js";
import { showUser } from "../controllers/userController.js"
import { verifyToken } from "../middleware/auth.js";
import { addEssay, addEssayPack, deleteEssay, deleteEssayPack, getAllEssayPacks, getAllEssays, showEssay, showEssayPack, updateEssay, updateEssayPack } from "../controllers/essayController.js";
const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', verifyToken, logout);

// User routes
router.get('/user', verifyToken, showUser);

// Essay routes
router.get('/essay', verifyToken, getAllEssayPacks);
router.get('/essay/item', verifyToken, getAllEssays);
router.get('/essay/:pack_id', verifyToken, showEssayPack);
router.get('/essay/item/:essay_id', verifyToken, showEssay);
router.post('/essay', verifyToken, addEssayPack);
router.post('/essay/item/:pack_id', verifyToken, addEssay);
router.put('/essay/:pack_id', verifyToken, updateEssayPack);
router.put('/essay/item/:essay_id', verifyToken, updateEssay);
router.delete('/essay/:pack_id', verifyToken, deleteEssayPack);
router.delete('/essay/item/:essay_id', verifyToken, deleteEssay);

export default router;