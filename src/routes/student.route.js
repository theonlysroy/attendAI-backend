import { Router } from "express";
import { register_student } from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
// const upload = multer({ dest: "uploads/" });

// post routes
router.route("/register").post(upload.single("avatar"), register_student);

export default router;
