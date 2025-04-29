import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import { components } from "../docs/swagger.docs.js";

// Для правильного пути
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MentalPRO API",
      version: "1.0.0",
      description:
        "Документация API для веб-приложения MentalPRO (мониторинг тревожности)",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Локальный сервер",
      },
      {
        url: "https://mentalpro.kiver.net/api",
        description: "Продакшн сервер",
      },
    ],
    components: {
      ...components,
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
