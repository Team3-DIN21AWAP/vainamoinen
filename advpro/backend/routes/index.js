import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getV1_GA, getV1_GM, getV1_SM, getV1_SA, getV1_NM, getV1_NA } from "../controllers/V1.js";
import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.get('/v1ga', getV1_GA);
router.get('/v1gm', getV1_GM);
router.get('/v1sm', getV1_SM);
router.get('/v1nm', getV1_NM);
router.get('/v1sa', getV1_SA);
router.get('/v1na', getV1_NA);
router.delete('/logout', Logout);
 
export default router;