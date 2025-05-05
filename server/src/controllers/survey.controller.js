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

    if (!survey) return res.status(404).json({ message: "Survey not found" });
    res.json(survey);
  },

  async create(req, res) {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(201).json(survey);
  },

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

  async update(req, res) {
    const { id } = req.params;
    const updated = await Survey.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Survey not found" });
    res.json(updated);
  },

  async remove(req, res) {
    const { id } = req.params;
    const removed = await Survey.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ message: "Survey not found" });
    res.json({ message: "Deleted successfully" });
  },
};
