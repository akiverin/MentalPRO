import { Practice } from "../models/practice.model.js";

export const PracticeController = {
  async getAll(req, res) {
    const practices = await Practice.find();
    res.json(practices);
  },

  async getById(req, res) {
    const { id } = req.params;
    const practice = await Practice.findById(id);
    console.log(id, practice);

    if (!practice)
      return res.status(404).json({ message: "Practice not found" });
    res.json(practice);
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
