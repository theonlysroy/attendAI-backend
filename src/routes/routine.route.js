import { Router } from "express";
import {
  create_routine,
  get_routines,
  get_routine,
  update_routine,
  delete_routine,
} from "../controllers/routine.controller.js";

const router = Router();
// secured routes
router.route("/create").post(create_routine);
router.route("/fetch").get(get_routines);
router.route("/fetch/:id").get(get_routine);
router.route("/update").put(update_routine);
router.route("/delete").delete(delete_routine);

export default router;
