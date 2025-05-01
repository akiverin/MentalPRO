import { Answer } from "../models/answer.model.js";

export const AnswerController = {
  async getAll(req, res) {
    try {
      const answers = await Answer.find();
      res.json(answers);
    } catch (error) {
      console.error("Ошибка получения ответов:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async getById(req, res) {
    try {
      const answer = await Answer.findById(req.params.id);
      if (!answer) return res.status(404).json({ message: "Answer not found" });
      res.json(answer);
    } catch (error) {
      console.error("Ошибка получения ответа:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async create(req, res) {
    try {
      const { text, points, number } = req.body;
      const answer = new Answer({ number, text, points });
      await answer.save();
      res.status(201).json(answer);
    } catch (error) {
      console.error("Ошибка создания ответа:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await Answer.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updated)
        return res.status(404).json({ message: "Answer not found" });
      res.json(updated);
    } catch (error) {
      console.error("Ошибка обновления ответа:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Answer.findByIdAndDelete(id);
      if (!deleted)
        return res.status(404).json({ message: "Answer not found" });
      res.json({ message: "Ответ удалён" });
    } catch (error) {
      console.error("Ошибка удаления ответа:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
