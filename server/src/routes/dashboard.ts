import express from "express";
import {
  getDashboard,
  updateProfile,
  updateAcademic,
} from "../controllers/dashboard";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getDashboard);
router.put("/profile", authMiddleware, updateProfile);
router.put("/academic/:id", authMiddleware, updateAcademic);

export default router;
