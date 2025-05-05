import { Question } from "../models/question.model.js";
import { Answer } from "../models/answer.model.js";

export const QuestionController = {
  async getAll(req, res) {
    try {
      const questions = await Question.find().populate("answers");
      res.json(questions);
    } catch (error) {
      console.error("Ошибка получения вопросов:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async getById(req, res) {
    try {
      const question = await Question.findById(req.params.id).populate(
        "answers"
      );
      if (!question)
        return res.status(404).json({ message: "Question not found" });
      res.json(question);
    } catch (error) {
      console.error("Ошибка получения вопроса:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async create(req, res) {
    try {
      const { text, section, answers = [], number } = req.body;

      const answerIds = [];
      for (const answerData of answers) {
        const existingAnswer = await Answer.findOne({
          number: answerData.number,
          text: answerData.text,
          points: answerData.points,
        });

        if (existingAnswer) {
          answerIds.push(existingAnswer._id);
        } else {
          const newAnswer = new Answer(answerData);
          await newAnswer.save();
          answerIds.push(newAnswer._id);
        }
      }

      const question = new Question({
        number,
        text,
        section,
        answers: answerIds,
      });
      await question.save();

      const populatedQuestion = await question.populate("answers");
      res.status(201).json(populatedQuestion);
    } catch (error) {
      console.error("Ошибка создания вопроса:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const updated = await Question.findByIdAndUpdate(id, req.body, {
        new: true,
      }).populate("answers");
      if (!updated)
        return res.status(404).json({ message: "Question not found" });
      res.json(updated);
    } catch (error) {
      console.error("Ошибка обновления вопроса:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },

  async remove(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Question.findByIdAndDelete(id);
      if (!deleted)
        return res.status(404).json({ message: "Question not found" });
      res.json({ message: "Вопрос удалён" });
    } catch (error) {
      console.error("Ошибка удаления вопроса:", error);
      res.status(500).json({ message: "Ошибка сервера" });
    }
  },
};
