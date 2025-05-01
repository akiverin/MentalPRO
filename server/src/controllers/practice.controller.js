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
        return res.status(404).json({ message: "Practice not found" });
      res.json(practice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка получения практики" });
    }
  },

  async create(req, res) {
    const practice = new Practice(req.body);
    await practice.save();
    res.status(201).json(practice);
  },

  async update(req, res) {
    const { id } = req.params;
    const updated = await Practice.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Practice not found" });
    res.json(updated);
  },

  async remove(req, res) {
    const { id } = req.params;
    const removed = await Practice.findByIdAndDelete(id);
    if (!removed)
      return res.status(404).json({ message: "Practice not found" });
    res.json({ message: "Deleted successfully" });
  },
};
