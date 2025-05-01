import mongoose from "mongoose";

const answerSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  text: { type: String, required: true },
  points: { type: Number, default: 0, required: true },
});

export const Answer = mongoose.model("Answer", answerSchema);
