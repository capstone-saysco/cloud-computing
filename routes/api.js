import express from "express";
import { register, login, logout, refreshToken } from "../controllers/authController.js";
import { showUser } from "../controllers/userController.js"
import { verifyToken } from "../middleware/auth.js";
import { addAnswer, addEssay, deleteAnswer, deleteEssay, getAllAnswers, getAllEssays, showAnswer, showEssay, updateAnswer, updateEssay } from "../controllers/essayController.js";
const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', verifyToken, logout);

// User routes
router.get('/user', verifyToken, showUser);

// Essay routes
router.get('/essay', verifyToken, getAllEssays);
router.get('/essay/answer/:essay_id', verifyToken, getAllAnswers);
router.get('/essay/:essay_id', verifyToken, showEssay);
router.get('/essay/answer/show/:answer_id', verifyToken, showAnswer);
router.post('/essay', verifyToken, addEssay);
router.post('/essay/answer/:essay_id', verifyToken, addAnswer);
router.put('/essay/:essay_id', verifyToken, updateEssay);
router.put('/essay/answer/:answer_id', verifyToken, updateAnswer);
router.delete('/essay/:essay_id', verifyToken, deleteEssay);
router.delete('/essay/answer/:answer_id', verifyToken, deleteAnswer);

export default router;