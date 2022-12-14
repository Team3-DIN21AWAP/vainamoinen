import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { getV1_GA, getV1_GM, getV1_SM, getV1_SA, 
         getV1_NM, getV1_NA, getV2 } from "../controllers/V1.js";
import { getV71, getV72 } from "../controllers/V7.js";
import { getV5 } from "../controllers/V5.js";
import { getV10 } from "../controllers/V10.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getV3a, getV3m, getV41, getV42, getV43 } from "../controllers/V3AndV4.js";
 
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
router.get('/v2', getV2);
router.get('/v71', getV71);
router.get('/v72', getV72);
router.get('/v5', getV5);
router.get('/v10', getV10);
router.get('/v3a', getV3a);
router.get('/v3m', getV3m);
router.get('/v41', getV41);
router.get('/v42', getV42);
router.get('/v43', getV43);
export default router;