import { Router } from "express";
const router = Router();

router.get("/", getAllSongs);
router.get("/:id", getSongById);

export default router;
