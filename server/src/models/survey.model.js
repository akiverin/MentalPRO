import mongoose from "mongoose";

const thresholdSchema = new mongoose.Schema(
  {
    min: {
      type: Number,
      required: true,
      min: 0,
    },
    max: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    color: {
      type: String,
      required: true,
      match: /^#([0-9A-F]{3}){1,2}$/i,
    },
  },
  { _id: false }
);

const sectionRangeSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    thresholds: {
      type: [thresholdSchema],
      required: true,
      validate: {
        validator: (arr) => arr.length > 0,
        message: "должен быть хотя бы один threshold в секции",
      },
    },
  },
  { _id: false }
);

const surveySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    details: { type: String, required: true },
    time: { type: Number, required: true },
    results: { type: String, required: false },
    questions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
    ],
    image: { type: String, required: false },
    isActive: { type: Boolean, default: true },
    ranges: {
      type: [sectionRangeSchema],
      default: [],
      validate: {
        validator: (arr) => arr.every((sec) => sec.thresholds.length > 0),
        message: "Каждая секция должна содержать хотя бы один threshold",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Survey = mongoose.model("Survey", surveySchema);
