import { Router } from "express";
import {
  register_student,
  login_student,
  logout_student,
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { get_faceData } from "../controllers/faceData.controller.js";

const router = Router();
// post routes
router.route("/register").post(upload.single("avatar"), register_student);
router.route("/login").post(upload.single("avatar"), login_student);
router.route("/faceData").get(get_faceData);

// secured routes
router.route("/logout").post(logout_student);
export default router;
