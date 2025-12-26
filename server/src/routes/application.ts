import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import {
  applyForCourse,
  getUserApplications,
} from "../controllers/application";

const router = Router();

router.post("/apply", authMiddleware, applyForCourse);
router.get("/my", authMiddleware, getUserApplications);

export default router;
