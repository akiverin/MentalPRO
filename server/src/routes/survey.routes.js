import express from "express";
import { SurveyController } from "../controllers/survey.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Surveys
 *   description: Monitoring mental health surveys
 */

/**
 * @openapi
 * /surveys:
 *   get:
 *     tags: [Surveys]
 *     summary: Get all surveys
 *     responses:
 *       200:
 *         description: List of all surveys
 */
router.get("/", SurveyController.getAll);

/**
 * @openapi
 * /surveys/{id}:
 *   get:
 *     tags: [Surveys]
 *     summary: Get a survey by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Survey details
 */
router.get("/:id", SurveyController.getById);

/**
 * @openapi
 * /surveys:
 *   post:
 *     tags: [Surveys]
 *     summary: Create a new survey
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Survey'
 *     responses:
 *       201:
 *         description: Survey created
 */
router.post("/", SurveyController.create);

/**
 * @openapi
 * /surveys/{id}:
 *   put:
 *     tags: [Surveys]
 *     summary: Update a survey
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
 *             $ref: '#/components/schemas/Survey'
 *     responses:
 *       200:
 *         description: Survey updated
 */
router.put("/:id", SurveyController.update);

/**
 * @openapi
 * /surveys/{id}:
 *   delete:
 *     tags: [Surveys]
 *     summary: Delete a survey
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Survey deleted
 */
router.delete("/:id", SurveyController.remove);

export default router;
