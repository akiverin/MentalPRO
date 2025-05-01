import express from "express";
import passport from "../config/passport.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: User authentication management
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/register", AuthController.register);
router.get("/confirm-email", AuthController.confirmEmail);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: Successfully logged in
 */
router.post("/login", AuthController.login);

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags: [Auth]
 *     summary: Get current user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => res.json(req.user)
);

router.get("/vk", passport.authenticate("vkontakte"));
router.get(
  "/vk/callback",
  passport.authenticate("vkontakte", { session: false }),
  AuthController.vkCallback
);

router.get(
  "/yandex",
  (req, res, next) => {
    console.log("→ /auth/yandex hit");
    next();
  },
  passport.authenticate("yandex")
);
router.get(
  "/yandex/callback",
  passport.authenticate("yandex", { session: false }),
  AuthController.yandexCallback
);

export default router;
