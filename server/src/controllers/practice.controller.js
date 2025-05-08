import fs from "fs";
import path from "path";
import { upload } from "../config/upload.js";
import { Practice } from "../models/practice.model.js";

export const PracticeController = {
  async getAll(req, res) {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const skip = (page - 1) * pageSize;
      const filter = search ? { title: { $regex: search, $options: "i" } } : {};

      const [total, practices] = await Promise.all([
        Practice.countDocuments(filter),
        Practice.find(filter).skip(skip).limit(Number(pageSize)),
      ]);

      res.json({
        data: practices,
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
      console.error(err);
      res.status(500).json({ message: "Ошибка получения практик" });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const practice = await Practice.findById(id);

      if (!practice)
        return res.status(404).json({ message: "Практика не найдена" });
      res.json(practice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка получения практики" });
    }
  },
  create: [
    upload.single("practiceCover"),
    async (req, res) => {
      try {
        const data = { ...req.body };

        if (req.file) {
          data.image = `/files/${req.file.filename}`;
        }

        const practice = new Practice(data);
        await practice.save();
        res.status(201).json(practice);
      } catch (err) {
        console.error("Ошибка создания практики:", err);
        res.status(500).json({ message: "Ошибка создания практики" });
      }
    },
  ],
  update: [
    upload.single("practiceCover"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const updates = { ...req.body };

        if (req.file) {
          updates.image = `/files/${req.file.filename}`;
          const prev = await Practice.findById(id).select("image");
          if (prev?.image) {
            const oldPath = path.join(
              process.cwd(),
              "uploads",
              path.basename(prev.image)
            );
            fs.unlink(oldPath, () => {});
          }
        }

        const updated = await Practice.findByIdAndUpdate(id, updates, {
          new: true,
          runValidators: true,
        });
        if (!updated)
          return res.status(404).json({ message: "Практика не найдена" });
        res.json(updated);
      } catch (err) {
        console.error("Ошибка обновления практики:", err);
        res.status(500).json({ message: "Ошибка сервера" });
      }
    },
  ],

  async remove(req, res) {
    try {
      const { id } = req.params;
      const practice = await Practice.findByIdAndDelete(id);

      if (!practice) {
        return res.status(404).json({ message: "Практика не найдена" });
      }

      if (practice.image) {
        const imagePath = path.join(
          process.cwd(),
          "uploads",
          path.basename(practice.image)
        );

        fs.access(imagePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(imagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Ошибка удаления изображения:", unlinkErr);
              }
            });
          }
        });
      }

      res.json({ message: "Практика успешно удалена" });
    } catch (err) {
      console.error("Ошибка удаления практики:", err);
      res.status(500).json({ message: "Ошибка сервера при удалении практики" });
    }
  },
};
