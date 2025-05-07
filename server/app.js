import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { swaggerUi, swaggerSpec } from "./src/config/swagger.js";
import path from "path";
import passport from "./src/config/passport.js";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import practiceRoutes from "./src/routes/practice.routes.js";
import surveyRoutes from "./src/routes/survey.routes.js";
import organizationRoutes from "./src/routes/organization.routes.js";
import questionRoutes from "./src/routes/question.routes.js";
import answerRoutes from "./src/routes/answer.routes.js";
import resultRoutes from "./src/routes/result.routes.js";
import applicationRoutes from "./src/routes/application.routes.js";
import multer from "multer";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/files", express.static(path.resolve(process.cwd(), "uploads")));

const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(
  cors({
    origin: ["http://localhost:3030"],
  })
);
app.use(express.json());
app.use(passport.initialize());

app.set("trust proxy", true);

app.use(
  "/api/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "MentalPRO API Docs",
    customCssUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui.min.css",
    customJs: [
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui-bundle.js",
      "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.21.0/swagger-ui-standalone-preset.js",
    ],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/survey", surveyRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/answer", answerRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/application", applicationRoutes);

app.use((err, req, res, next) => {
  console.error("🛑 Uncaught error:", err);
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ message: "Файл слишком большой" });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "Неверное поле файла" });
    }
  }
  if (err.message === "Unexpected end of form") {
    return res.status(400).json({ message: "Неверный формат запроса" });
  }
  const status = err.status || 500;
  return res
    .status(status)
    .json({ message: err.message || "Internal Server Error" });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });
