import { Router } from "express";
import {
  create_paper,
  get_papers,
  get_paper,
  update_paper,
  delete_paper,
} from "../controllers/paper.controller.js";

const router = Router();
router.route("/create").post(create_paper);
router.route("/").get(get_papers);
router.route("/:id").get(get_paper);
router.route("/update").put(update_paper);
router.route("/delete").delete(delete_paper);

export default router;
