import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middeware.js";
import { getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/feature", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;
