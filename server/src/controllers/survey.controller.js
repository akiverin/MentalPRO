import fs from "fs";
import path from "path";
import { upload } from "../config/upload.js";
import { Survey } from "../models/survey.model.js";

export const SurveyController = {
  async getAll(req, res) {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const skip = (page - 1) * pageSize;
      const filter = search ? { title: { $regex: search, $options: "i" } } : {};

      const [total, surveys] = await Promise.all([
        Survey.countDocuments(filter),
        Survey.find(filter).skip(skip).limit(Number(pageSize)),
      ]);

      res.json({
        data: surveys,
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
      res.status(500).json({ message: "Ошибка получения опросов" });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    const survey = await Survey.findById(id);

    if (!survey) return res.status(404).json({ message: "Опрос не найден" });
    res.json(survey);
  },

  create: [
    upload.single("surveyCover"),
    async (req, res) => {
      try {
        const data = { ...req.body };

        if (data.questions) {
          data.questions = JSON.parse(data.questions);
        }
        if (data.ranges) {
          data.ranges = JSON.parse(data.ranges);
        }

        if (data.time) {
          data.time = Number(data.time);
        }
        if (typeof data.isActive === "string") {
          data.isActive = data.isActive === "true";
        }

        if (req.file) {
          data.image = `/files/${req.file.filename}`;
        }

        const survey = new Survey(data);
        await survey.save();
        res.status(201).json(survey);
      } catch (err) {
        console.error("Ошибка создания опроса:", err);
        res.status(500).json({ message: "Ошибка создания опроса" });
      }
    },
  ],

  async getQuestions(req, res) {
    try {
      const { id } = req.params;
      const survey = await Survey.findById(id).populate({
        path: "questions",
        populate: {
          path: "answers",
        },
      });

      if (!survey) return res.status(404).json({ message: "Survey not found" });

      res.json({
        surveyId: survey._id,
        questions: survey.questions,
      });
    } catch (err) {
      console.error("Ошибка получения вопросов:", err);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  update: [
    upload.single("surveyCover"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const updates = { ...req.body };

        if (req.file) {
          updates.image = `/files/${req.file.filename}`;
          const prev = await Survey.findById(id).select("image");
          if (prev?.image) {
            const oldPath = path.join(
              process.cwd(),
              "uploads",
              path.basename(prev.image)
            );
            fs.unlink(oldPath, () => {});
          }
        }

        const updated = await Survey.findByIdAndUpdate(id, updates, {
          new: true,
          runValidators: true,
        });
        if (!updated)
          return res.status(404).json({ message: "Опрос не найден" });
        res.json(updated);
      } catch (err) {
        console.error("Ошибка обновления опроса:", err);
        res.status(500).json({ message: "Ошибка сервера" });
      }
    },
  ],

  async remove(req, res) {
    try {
      const { id } = req.params;
      const survey = await Survey.findByIdAndDelete(id);

      if (!survey) {
        return res.status(404).json({ message: "Опрос не найден" });
      }

      if (survey.image) {
        const imagePath = path.join(
          process.cwd(),
          "uploads",
          path.basename(survey.image)
        );

        fs.access(imagePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(imagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Ошибка удаления изображения опроса:", unlinkErr);
              }
            });
          }
        });
      }

      res.json({ message: "Опрос успешно удален" });
    } catch (err) {
      console.error("Ошибка при удалении опроса:", err);
      res.status(500).json({ message: "Ошибка сервера при удалении опроса" });
    }
  },
};
