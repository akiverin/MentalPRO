import express from "express";
import { ApplicationController } from "../controllers/application.controller.js";
import passport from "passport";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Applications
 *   description: Applications for joining organizations inside the web application
 */

/**
 * @openapi
 * /application:
 *   get:
 *     tags: [Applications]
 *     summary: Get all applications
 *     responses:
 *       200:
 *         description: Applications details
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.getAll
);

/**
 * @openapi
 * /application/{id}:
 *   get:
 *     tags: [Applications]
 *     summary: Get a applications by user
 *     responses:
 *       200:
 *         description: Applications details
 */
router.get(
  "/my",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.getByUser
);

/**
 * @openapi
 * /application/{id}:
 *   get:
 *     tags: [Applications]
 *     summary: Get a applications by organization
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
  ApplicationController.getByOrganization
);

/**
 * @openapi
 * /application:
 *   post:
 *     tags: [Applications]
 *     summary: Create a new application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Application'
 *     responses:
 *       201:
 *         description: Application created
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ApplicationController.create
);

/**
 * @openapi
 *  /application/{id}:
 *  get:
 *    tags: [Applications]
 *    summary: Get status application by id
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *  responses:
 *    200:
 *     description: Application details
 */
router.patch("/:id/status", ApplicationController.updateStatus);

/**
 * @openapi
 * /application/{id}:
 *   delete:
 *     tags: [Applications]
 *     summary: Delete an application
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application deleted
 */
router.delete("/:id", ApplicationController.remove);

export default router;
