export const components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      description: "Введите токен JWT для авторизации",
    },
  },
  schemas: {
    User: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60d0fe4f5311236168a109ca" },
        firstName: { type: "string", example: "Андрей" },
        lastName: { type: "string", example: "Киверин" },
        email: { type: "string", example: "user@example.com" },
        avatarUrl: {
          type: "string",
          example: "https://example.com/avatar.jpg",
        },
        vkId: { type: "string", example: "123456789" },
        yandexId: { type: "string", example: "yandex_user_id" },
        role: {
          type: "string",
          enum: ["client", "admin", "hr"],
          example: "client",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-25T12:00:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-26T08:30:00.000Z",
        },
      },
      required: ["email", "firstName"],
    },
    UserRegistration: {
      type: "object",
      properties: {
        firstName: { type: "string", example: "Иван" },
        lastName: { type: "string", example: "Иванов" },
        email: { type: "string", example: "ivanov@example.com" },
        password: { type: "string", example: "StrongPassword123" },
      },
      required: ["email", "password", "firstName", "lastName"],
    },
    UserLogin: {
      type: "object",
      properties: {
        email: { type: "string", example: "user@example.com" },
        password: { type: "string", example: "StrongPassword123" },
      },
      required: ["email", "password"],
    },
    ErrorResponse: {
      type: "object",
      properties: {
        message: { type: "string", example: "Ошибка авторизации" },
      },
    },
  },
};
