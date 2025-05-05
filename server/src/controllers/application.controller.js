import { Application } from "../models/application.model.js";
import { Organization } from "../models/organization.model.js";

export const ApplicationController = {
  async getAll(req, res) {
    try {
      const applications = await Application.find()
        .populate("userId", "firstName lastName email")
        .populate("organizationId", "title");

      res.json(applications);
    } catch (error) {
      console.error("Ошибка при получении заявок:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async getByOrganization(req, res) {
    try {
      const { id } = req.params;

      const applications = await Application.find({ organizationId: id })
        .populate("userId", "firstName lastName email")
        .populate("organizationId", "title");

      res.json(applications);
    } catch (error) {
      console.error("Ошибка при получении заявок по организации:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async getByUser(req, res) {
    try {
      const id = req.user?._id;
      if (!id) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const applications = await Application.find({ userId: id }).populate(
        "organizationId",
        "title"
      );

      res.json(applications);
    } catch (error) {
      console.error("Ошибка при получении заявок пользователя:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async create(req, res) {
    try {
      const userId = req.user._id;
      const { organizationId } = req.body;

      const existing = await Application.findOne({ userId, organizationId });
      if (existing) {
        return res.status(400).json({ message: "Заявка уже существует" });
      }

      const application = new Application({ userId, organizationId });
      await application.save();

      res.status(201).json(application);
    } catch (error) {
      console.error("Ошибка при создании заявки:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Недопустимый статус" });
      }

      const application = await Application.findById(id);

      if (!application) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }

      application.status = status;
      await application.save();

      if (status === "approved") {
        await Organization.findByIdAndUpdate(
          application.organizationId,
          {
            $addToSet: { members: application.userId },
          },
          { new: true }
        );
      }

      res.json(application);
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;

      const removed = await Application.findByIdAndDelete(id);
      if (!removed) {
        return res.status(404).json({ message: "Заявка не найдена" });
      }

      res.json({ message: "Заявка удалена" });
    } catch (error) {
      console.error("Ошибка при удалении заявки:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
