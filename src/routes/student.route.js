import { Router } from "express";
import {
  register_student,
  login_student,
  logout_student,
  get_studentData,
  getDashboard,
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { get_faceData } from "../controllers/faceData.controller.js";
import { adminLogin } from "../controllers/admin.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Students API
 */

// post routes
/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *       - Student
 *     summary: Register a student
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                statusCode:
 *                  type: number
 *                data:
 *                  type: object
 *                message:
 *                  type: string
 *                success:
 *                  type: boolean
 */
router.route("/register").post(upload.single("avatar"), register_student);
router.route("/login").post(upload.single("avatar"), login_student);
router.route("/admin/login").post(adminLogin);
router.route("/faceData").get(get_faceData);
router.route("/studentData").get(verifyAccessToken, get_studentData);
router.route("/dashboard").get(verifyAccessToken, getDashboard);

// secured routes
router.route("/logout").post(verifyAccessToken, logout_student);
export default router;
