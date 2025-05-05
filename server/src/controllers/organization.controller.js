import { Organization } from "../models/organization.model.js";

export const OrganizationController = {
  async getAll(req, res) {
    try {
      const { page = 1, pageSize = 10, search = "" } = req.query;
      const skip = (page - 1) * pageSize;

      const filter = search ? { title: { $regex: search, $options: "i" } } : {};

      const [total, organizations] = await Promise.all([
        Organization.countDocuments(filter),
        Organization.find(filter)
          .skip(skip)
          .limit(Number(pageSize))
          .populate("members", "firstName lastName email")
          .populate("administrators", "firstName lastName email"),
      ]);

      res.json({
        data: organizations,
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
      res.status(500).json({ message: "Ошибка при получении организаций" });
    }
  },

  async getById(req, res) {
    const { id } = req.params;
    try {
      const organization = await Organization.findById(id)
        .populate("members", "firstName lastName email")
        .populate("administrators", "firstName lastName email");

      if (!organization)
        return res.status(404).json({ message: "Организация не найдена" });

      res.json(organization);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при получении организации" });
    }
  },

  async create(req, res) {
    try {
      const organization = new Organization({
        ...req.body,
        createdBy: req.user._id, // предполагается, что пользователь прошёл авторизацию
      });
      await organization.save();
      res.status(201).json(organization);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при создании организации" });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    try {
      const updated = await Organization.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updated)
        return res.status(404).json({ message: "Организация не найдена" });

      res.json(updated);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при обновлении организации" });
    }
  },

  async remove(req, res) {
    const { id } = req.params;
    try {
      const deleted = await Organization.findByIdAndDelete(id);
      if (!deleted)
        return res.status(404).json({ message: "Организация не найдена" });

      res.json({ message: "Организация успешно удалена" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при удалении организации" });
    }
  },
};
