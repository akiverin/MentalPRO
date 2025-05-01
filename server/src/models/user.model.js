import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, trim: true },
    patronymic: { type: String, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailConfirmed: { type: Boolean, default: false },
    emailConfirmToken: { type: String, select: false },
    password: { type: String, select: false },
    image: { type: String, default: "" },
    vkId: { type: String, index: true, sparse: true },
    yandexId: { type: String, index: true, sparse: true },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
    role: { type: String, enum: ["client", "hr", "admin"], default: "client" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew && this.email) {
    this.emailConfirmToken = crypto.randomBytes(20).toString("hex");
  }
  next();
});

export default mongoose.model("User", userSchema);
