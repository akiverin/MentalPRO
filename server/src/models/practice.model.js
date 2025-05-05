import mongoose from "mongoose";

const practiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: false },
  },
  { timestamps: true }
);

export const Practice = mongoose.model("Practice", practiceSchema);
