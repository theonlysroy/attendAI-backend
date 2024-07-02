import { Router } from "express";
import {
  create_teacher,
  get_teachers,
  get_teacher,
  update_teacher,
  delete_teacher,
} from "../controllers/teacher.controller.js";

const router = Router();
router.route("/create").post(create_teacher);
router.route("/").get(get_teachers);
router.route("/:id").get(get_teacher);
router.route("/update").put(update_teacher);
router.route("/delete").delete(delete_teacher);

export default router;
