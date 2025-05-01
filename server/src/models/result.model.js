import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    surveyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Survey",
      required: true,
    },
    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        answerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Answer",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Result = mongoose.model("Result", resultSchema);
