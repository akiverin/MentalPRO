import { Result } from "../models/result.model.js";

export const ResultController = {
  async create(req, res) {
    try {
      const { surveyId, answers } = req.body;
      const userId = req.user?._id;

      const result = await Result.create({
        userId,
        surveyId,
        answers,
      });

      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Не удалось сохранить результаты" });
    }
  },

  async getByUser(req, res) {
    try {
      const results = await Result.find({
        userId: req.user?._id,
      })
        .populate("surveyId")
        .populate({
          path: "answers",
          populate: {
            path: "questionId answerId",
          },
        });
      res.json(results);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Ошибка при получении результатов пользователя" });
    }
  },
};
