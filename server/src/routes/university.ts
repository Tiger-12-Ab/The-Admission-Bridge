import { Router } from "express";
import { getUniversities, getUniversityDetails, getCompareCourses } from "../controllers/university";

const router = Router();

router.get("/universities", getUniversities);
router.get("/universities/:id", getUniversityDetails);
router.post("/compare", getCompareCourses);

export default router;
