import { Organization } from "../models/organization.model.js";
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
  async getByOrganization(req, res) {
    try {
      const { id } = req.params;
      const currentUserId = req.user?._id;
      const organization = await Organization.findById(id).lean();

      if (!organization || !Array.isArray(organization.members)) {
        return res.status(404).json({
          message: "Организация не найдена или не содержит участников",
        });
      }

      const isCreator =
        organization.createdBy &&
        organization.createdBy.toString() === currentUserId.toString();

      const isAdmin =
        Array.isArray(organization.administrators) &&
        organization.administrators.some(
          (adminId) => adminId.toString() === currentUserId.toString()
        );

      // if (!isCreator && !isAdmin) {
      //   return res
      //     .status(403)
      //     .json({ message: "У вас нет прав для просмотра данных организации" });
      // }

      const results = await Result.find({
        userId: { $in: organization.members },
      })
        .populate("userId", "firstName lastName email")
        .populate("surveyId", "title ranges")
        .populate({
          path: "answers",
          populate: {
            path: "questionId answerId",
          },
        });

      res.json(results);
    } catch (error) {
      console.error("Ошибка при получении результатов по организации:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
