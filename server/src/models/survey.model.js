import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    details: { type: String, required: true },
    time: { type: Number, required: true },
    results: { type: String, required: false },
    image: { type: String, required: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const Survey = mongoose.model("Survey", surveySchema);
