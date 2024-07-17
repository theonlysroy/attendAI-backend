import { Router } from "express";
import { get_faceData } from "../controllers/faceData.controller.js";

const router = Router();

router.route("/:collegeRollNo").get(get_faceData);

export default router;
