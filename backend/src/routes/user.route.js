import { Router } from "express";
import { protectRoute } from "../middleware/auth.middeware.js";
import { getAllUsers, getMessages } from "../controller/user.controller.js";
const router = Router();

router.get("/", protectRoute, getAllUsers);
//TODO:: add message sending routes

router.get("/messages/:userId", protectRoute, getMessages);

export default router;
