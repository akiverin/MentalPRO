import express from "express";
import passport from "../config/passport.js";
import { UserController } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @openapi
 * /user:
 *   get:
 *     tags: [Users]
 *     summary: Получить список всех пользователей
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список пользователей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.getAll
);

/**
 * @openapi
 * /user/me:
 *   get:
 *     tags: [Users]
 *     summary: Получить информацию о текущем пользователе
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Данные текущего пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  UserController.getMe
);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Получить пользователя по ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Уникальный идентификатор пользователя
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Данные пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.getById
);

/**
 * @openapi
 * /user:
 *   post:
 *     tags: [Users]
 *     summary: Создать нового пользователя
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Данные для регистрации нового пользователя
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.create
);

/**
 * @openapi
 * /user/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Обновить данные пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Уникальный идентификатор пользователя
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Поля для обновления (частичный объект User)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Данные пользователя обновлены
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.update
);

/**
 * @openapi
 * /user/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Удалить пользователя
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Уникальный идентификатор пользователя
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Пользователь успешно удалён
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.remove
);

export default router;
