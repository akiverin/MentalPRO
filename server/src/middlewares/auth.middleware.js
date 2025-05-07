import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Не задана переменная окружения JWT_SECRET");
}

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers["x-access-token"];
  if (!authHeader) {
    return res.status(401).json({ message: "Необходим токен авторизации" });
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return res.status(401).json({ message: "Необходим токен авторизации" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Пользователь не найден" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Ошибка авторизации:", err);
    return res.status(401).json({ message: "Неверный или просроченный токен" });
  }
};
