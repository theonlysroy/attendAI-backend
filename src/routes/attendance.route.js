import { Router } from "express";
import { markAttendance } from "../controllers/attendance.controller.js";

const router = Router();
router.route("/:collegeRoll").post(markAttendance);
export default router;
