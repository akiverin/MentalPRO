import { AuthService } from "../services/auth.service.js";
import jwt from "jsonwebtoken";

export class AuthController {
  static async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: "Зарегистрировано. Проверьте почту." });
    } catch (err) {
      next(err);
    }
  }

  static async confirmEmail(req, res, next) {
    try {
      await AuthService.confirmEmail(req.query.token);
      res.redirect(`${process.env.FRONTEND_URL}/email-confirmed`);
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { user, token } = await AuthService.login(req.body);
      res.json({
        token,
        user: { id: user._id, firstName: user.firstName, role: user.role },
      });
    } catch (err) {
      next(err);
    }
  }

  // OAuth-колбэки
  static vkCallback(req, res) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.FRONTEND_URL}/oauth?token=${token}`);
  }

  static yandexCallback(req, res) {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`${process.env.FRONTEND_URL}/yandex-oauth?token=${token}`);
  }
}
