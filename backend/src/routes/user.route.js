import { Router } from "express";
import { protectRoute } from "../middleware/auth.middeware.js";
import { getAllUsers } from "../controller/user.controller.js";
const router = Router();

router.get("/", protectRoute, getAllUsers);
//TODO:: add message sending routes

export default router;
