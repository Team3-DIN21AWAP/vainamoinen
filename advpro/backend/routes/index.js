import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getV3a, getV3m, getV41, getV42, getV43 } from "../controllers/V3AndV4.js";

const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/v3a', getV3a);
router.get('/v3m', getV3m);
router.get('/v41', getV41);
router.get('/v42', getV42);
router.get('/v43', getV43);

export default router;