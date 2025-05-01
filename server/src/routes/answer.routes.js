import express from "express";
import { AnswerController } from "../controllers/answer.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Answers
 *   description: Managing mental health answers
 */

/**
 * @openapi
 * /answer:
 *   get:
 *     tags: [Answers]
 *     summary: Get all answers
 *     responses:
 *       200:
 *         description: List of all answers
 */
router.get("/", authMiddleware, AnswerController.getAll);

/**
 * @openapi
 * /answer/{id}:
 *   get:
 *     tags: [Answers]
 *     summary: Get a answer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Answer details
 */
router.get("/:id", authMiddleware, AnswerController.getById);

/**
 * @openapi
 * /answer:
 *   post:
 *     tags: [Answers]
 *     summary: Create a new answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       201:
 *         description: Answer created
 */
router.post("/", authMiddleware, AnswerController.create);

/**
 * @openapi
 * /answer/{id}:
 *   put:
 *     tags: [Answers]
 *     summary: Update a answer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Answer'
 *     responses:
 *       200:
 *         description: Answer updated
 */
router.put("/:id", authMiddleware, AnswerController.update);

/**
 * @openapi
 * /answer/{id}:
 *   delete:
 *     tags: [Answers]
 *     summary: Delete a answer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Answer deleted
 */
router.delete("/:id", authMiddleware, AnswerController.remove);

export default router;
