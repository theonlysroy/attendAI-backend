import { Router } from "express";
import {
  get_all_notice,
  get_notice_by_id,
  post_notice,
  update_notice,
  delete_notice,
} from "../controllers/notice.controller.js";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Notice
 *   description: College Notice management API
 */

// get routes
/**
 * @openapi
 * /notice:
 *   get:
 *     tags:
 *       - Notice
 *     summary: Get all notices
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
 *                  type: array
 *                message:
 *                  type: string
 *                success:
 *                  type: boolean
 */
router.route("").get(get_all_notice);

/**
 * @openapi
 * /notice/{noticeId}:
 *   get:
 *     tags:
 *       - Notice
 *     summary: Get a notice by noticeId
 *     parameters:
 *       - in: path
 *         name: noticeId
 *         schema:
 *           type: string
 *         required: true
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
router.route("/:noticeId").get(get_notice_by_id);

/**
 * @openapi
 * /notice/create:
 *   post:
 *     tags:
 *       - Notice
 *     summary: Create a notice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noticeId:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
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
router.route("/create").post(post_notice);

/**
 * @openapi
 * /notice/update:
 *   put:
 *     tags:
 *       - Notice
 *     summary: Update a notice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               noticeId:
 *                 type: string
 *               title:
 *                 type: string
 *               content:
 *                 type: string
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
router.route("/update").put(update_notice);

/**
 * @openapi
 * /notice/delete:
 *   delete:
 *     tags:
 *       - Notice
 *     summary: Delete a notice
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
router.route("/delete").delete(delete_notice);

export default router;
