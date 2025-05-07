import express from "express";
import { PracticeController } from "../controllers/practice.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Practices
 *   description: Managing mental health practices
 */

/**
 * @openapi
 * /practice:
 *   get:
 *     tags: [Practices]
 *     summary: Get all practices
 *     responses:
 *       200:
 *         description: List of all practices
 */
router.get("/", PracticeController.getAll);

/**
 * @openapi
 * /practice/{id}:
 *   get:
 *     tags: [Practices]
 *     summary: Get a practice by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Practice details
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  PracticeController.getById
);

/**
 * @openapi
 * /practice:
 *   post:
 *     tags: [Practices]
 *     summary: Create a new practice
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Practice'
 *     responses:
 *       201:
 *         description: Practice created
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  PracticeController.create
);

/**
 * @openapi
 * /practice/{id}:
 *   put:
 *     tags: [Practices]
 *     summary: Update a practice
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
 *             $ref: '#/components/schemas/Practice'
 *     responses:
 *       200:
 *         description: Practice updated
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  PracticeController.update
);

/**
 * @openapi
 * /practice/{id}:
 *   delete:
 *     tags: [Practices]
 *     summary: Delete a practice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Practice deleted
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  PracticeController.remove
);

export default router;
