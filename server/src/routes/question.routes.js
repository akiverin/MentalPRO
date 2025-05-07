import express from "express";
import { QuestionController } from "../controllers/question.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Questions
 *   description: Managing mental health questions
 */

/**
 * @openapi
 * /question:
 *   get:
 *     tags: [Questions]
 *     summary: Get all questions
 *     responses:
 *       200:
 *         description: List of all questions
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  QuestionController.getAll
);

/**
 * @openapi
 * /question/{id}:
 *   get:
 *     tags: [Questions]
 *     summary: Get a question by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question details
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  QuestionController.getById
);

/**
 * @openapi
 * /question:
 *   post:
 *     tags: [Questions]
 *     summary: Create a new question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question created
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  QuestionController.create
);

/**
 * @openapi
 * /question/{id}:
 *   put:
 *     tags: [Questions]
 *     summary: Update a question
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
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Question updated
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  QuestionController.update
);

/**
 * @openapi
 * /question/{id}:
 *   delete:
 *     tags: [Questions]
 *     summary: Delete a question
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Question deleted
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  QuestionController.remove
);

export default router;
