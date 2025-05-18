import express from "express";
import { ResultController } from "../controllers/result.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

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
 *     responses:
 *       200:
 *         description: Results details
 */
router.get(
  "/my",
  passport.authenticate("jwt", { session: false }),
  ResultController.getByUser
);

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
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ResultController.create
);

/**
 * @openapi
 * /result/organization/{id}:
 *   get:
 *     tags: [Results]
 *     summary: Get a results by organization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Applications details
 */
router.get(
  "/organization/:id",
  passport.authenticate("jwt", { session: false }),
  ResultController.getByOrganization
);

export default router;
