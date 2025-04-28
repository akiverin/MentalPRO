import express from "express";
import passport from "../config/passport.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.get("/confirm-email", AuthController.confirmEmail);
router.post("/login", AuthController.login);

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

router.get("/yandex", passport.authenticate("yandex"));
router.get(
  "/yandex/callback",
  passport.authenticate("yandex", { session: false }),
  AuthController.yandexCallback
);

export default router;
