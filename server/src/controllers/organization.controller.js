import fs from "fs";
import path from "path";
import { upload } from "../config/upload.js";
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
        .populate("members", "firstName lastName email image")
        .populate("administrators", "firstName lastName email image");

      if (!organization)
        return res.status(404).json({ message: "Организация не найдена" });

      res.json(organization);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при получении организации" });
    }
  },

  create: [
    upload.single("organizationCover"),
    async (req, res) => {
      try {
        const data = {
          ...req.body,
          members: [req.user._id],
          createdBy: req.user._id,
        };

        if (req.file) {
          data.image = `/files/${req.file.filename}`;
        }

        const organization = new Organization(data);
        await organization.save();
        res.status(201).json(organization);
      } catch (err) {
        console.error("Ошибка создания организации:", err);
        res.status(500).json({ message: "Ошибка создания организации" });
      }
    },
  ],

  update: [
    upload.single("organizationCover"),
    async (req, res) => {
      try {
        const { id } = req.params;
        const author = req.user._id;
        const organization = await Organization.findById(id);
        if (!organization) {
          return res.status(404).json({ message: "Организация не найдена" });
        }
        if (
          !organization.administrators.includes(author) &&
          organization.createdBy.toString() !== author.toString()
        ) {
          return res.status(403).json({
            message: "У вас нет прав для редактирования этой организации",
          });
        }

        const updates = { ...req.body };
        if (updates.members) {
          updates.members = JSON.parse(updates.members);
        }
        if (updates.administrators) {
          updates.administrators = JSON.parse(updates.administrators);
        }

        if (req.file) {
          updates.image = `/files/${req.file.filename}`;
          const prev = await Organization.findById(id).select("image");
          if (prev?.image) {
            const oldPath = path.join(
              process.cwd(),
              "uploads",
              path.basename(prev.image)
            );
            fs.unlink(oldPath, () => {});
          }
        }

        const updated = await Organization.findByIdAndUpdate(id, updates, {
          new: true,
          runValidators: true,
        });
        if (!updated)
          return res.status(404).json({ message: "Практика не найдена" });
        res.json(updated);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении организации" });
      }
    },
  ],

  async remove(req, res) {
    try {
      const { id } = req.params;
      const organization = await Organization.findByIdAndDelete(id);
      if (!organization) {
        return res.status(404).json({ message: "Организация не найдена" });
      }

      if (organization.image) {
        const imagePath = path.join(
          process.cwd(),
          "uploads",
          path.basename(organization.image)
        );

        fs.access(imagePath, fs.constants.F_OK, (err) => {
          if (!err) {
            fs.unlink(imagePath, (unlinkErr) => {
              if (unlinkErr) {
                console.error("Ошибка удаления изображения:", unlinkErr);
              }
            });
          }
        });
      }
      res.json({ message: "Организация успешно удалена" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Ошибка при удалении организации" });
    }
  },
};
