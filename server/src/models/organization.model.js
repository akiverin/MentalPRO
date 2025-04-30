import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 255 },
    description: { type: String, required: true },
    image: { type: String, required: false },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    administrators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isActive: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Organization = mongoose.model("Organization", organizationSchema);
