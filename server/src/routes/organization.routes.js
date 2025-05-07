import express from "express";
import { OrganizationController } from "../controllers/organization.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import passport from "passport";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Organizations
 *   description: Managing mental health organizations
 */

/**
 * @openapi
 * /organization:
 *   get:
 *     tags: [Organizations]
 *     summary: Get all organizations
 *     responses:
 *       200:
 *         description: List of all organizations
 */
router.get("/", OrganizationController.getAll);

/**
 * @openapi
 * /organization/{id}:
 *   get:
 *     tags: [Organizations]
 *     summary: Get a organization by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organization details
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  OrganizationController.getById
);

/**
 * @openapi
 * /organization:
 *   post:
 *     tags: [Organizations]
 *     summary: Create a new organization
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       201:
 *         description: Organization created
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  OrganizationController.create
);

/**
 * @openapi
 * /organization/{id}:
 *   put:
 *     tags: [Organizations]
 *     summary: Update a organization
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
 *             $ref: '#/components/schemas/Organization'
 *     responses:
 *       200:
 *         description: Organization updated
 */
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  OrganizationController.update
);

/**
 * @openapi
 * /organization/{id}:
 *   delete:
 *     tags: [Organizations]
 *     summary: Delete a organization
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Organization deleted
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  OrganizationController.remove
);

export default router;
