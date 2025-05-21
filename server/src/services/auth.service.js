import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { sendConfirmationEmail } from "../utils/mailer.js";

export class AuthService {
  static async register({ firstName, lastName, email, password, role }) {
    const exists = await User.findOne({ email });
    if (exists) throw { status: 409, message: "Email уже занят" };
    if (role === "admin")
      throw {
        status: 403,
        message: "Нет доступа для регистрации администратора",
      };
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      role,
    });
    await sendConfirmationEmail(user);
    return user;
  }

  static async confirmEmail(token) {
    const user = await User.findOne({ emailConfirmToken: token });
    if (!user) throw { status: 400, message: "Неверный токен подтверждения" };
    user.emailConfirmed = true;
    user.emailConfirmToken = undefined;
    await user.save();
    return user;
  }

  static async login({ email, password }) {
    const user = await User.findOne({ email }).select("+password");
    if (!user) throw { status: 401, message: "Неверные учётные данные" };
    if (!user.emailConfirmed)
      throw { status: 403, message: "Email не подтверждён" };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw { status: 401, message: "Неверные учётные данные" };
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return { user, token };
  }
}
