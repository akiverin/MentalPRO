import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    number: { type: Number, required: true },
    text: { type: String, required: true },
    section: { type: String, required: false },
    answers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Answer", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", questionSchema);
