import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { upload } from "../config/upload.js";

export const UserController = {
  async getAll(req, res) {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const skip = (page - 1) * pageSize;
      const filter = search
        ? {
            $or: [
              { firstName: { $regex: search, $options: "i" } },
              { lastName: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const [total, users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
          .select("-password -emailConfirmToken")
          .skip(skip)
          .limit(Number(pageSize))
          .lean(),
      ]);

      res.json({
        data: users,
        meta: {
          pagination: {
            page: Number(page),
            pageSize: Number(pageSize),
            pageCount: Math.ceil(total / pageSize),
            total,
          },
        },
      });
    } catch (err) {
      console.error("Ошибка получения пользователей:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id)
        .select("-password -emailConfirmToken")
        .lean();
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (err) {
      console.error("Ошибка получения пользователя:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async create(req, res) {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      if (await User.findOne({ email })) {
        return res.status(409).json({ message: "Email уже занят" });
      }
      const hash = await bcrypt.hash(password, 12);
      const user = new User({
        firstName,
        lastName,
        email,
        password: hash,
        role,
      });
      await user.save();
      const out = user.toObject();
      delete out.password;
      delete out.emailConfirmToken;
      res.status(201).json(out);
    } catch (err) {
      console.error("Ошибка создания пользователя:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  update: [
    upload.single("avatar"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const updates = { ...req.body };

        if (updates.password) {
          updates.password = await bcrypt.hash(updates.password, 12);
        }

        if (req.file) {
          updates.image = `/files/${req.file.filename}`;
          const prev = await User.findById(id).select("image");
          if (prev?.image) {
            const oldPath = path.join(
              process.cwd(),
              "uploads",
              path.basename(prev.image)
            );
            fs.unlink(oldPath, () => {});
          }
        }

        const user = await User.findByIdAndUpdate(id, updates, {
          new: true,
          runValidators: true,
        })
          .select("-password -emailConfirmToken")
          .lean();

        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка сервера" });
      }
    },
  ],

  async remove(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id).lean();
      if (!user) return res.status(404).json({ message: "User not found" });

      if (user.image) {
        const oldPath = path.join(
          process.cwd(),
          "uploads",
          path.basename(user.image)
        );
        fs.unlink(oldPath, () => {});
      }

      res.json({ message: "User deleted" });
    } catch (err) {
      console.error("Ошибка удаления пользователя:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async getMe(req, res) {
    try {
      const u = req.user.toObject();
      delete u.password;
      delete u.emailConfirmToken;
      res.json(u);
    } catch (err) {
      console.error("Ошибка получения профиля:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
