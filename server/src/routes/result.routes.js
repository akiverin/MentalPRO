import express from "express";
import { ResultController } from "../controllers/result.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Results
 *   description: Monitoring mental health results
 */

/**
 * @openapi
 * /result/{id}:
 *   get:
 *     tags: [Results]
 *     summary: Get a results by user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Results details
 */
router.get("/my", authMiddleware, ResultController.getByUser);

/**
 * @openapi
 * /result:
 *   post:
 *     tags: [Results]
 *     summary: Create a new result
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Result'
 *     responses:
 *       201:
 *         description: Result created
 */
router.post("/", ResultController.create);

export default router;
