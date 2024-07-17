import { Router } from "express";
import {
  create_routine,
  get_routines,
  update_routine,
  delete_routine,
  get_routine_by_id,
} from "../controllers/routine.controller.js";

const router = Router();
// secured routes
router.route("/create").post(create_routine);
router.route("").get(get_routines);
router.route("/ro?:id").get(get_routine_by_id);
router.route("/update").put(update_routine);
router.route("/delete").delete(delete_routine);

export default router;
