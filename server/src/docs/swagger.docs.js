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
    Threshold: {
      type: "object",
      properties: {
        min: { type: "number", example: 0 },
        max: { type: "number", example: 10 },
        title: { type: "string", example: "Низкий уровень" },
        color: { type: "string", example: "#FF0000" },
      },
      required: ["min", "max", "title", "color"],
    },
    SectionRange: {
      type: "object",
      properties: {
        section: { type: "string", example: "Эмоции" },
        thresholds: {
          type: "array",
          items: { $ref: "#/components/schemas/Threshold" },
        },
      },
      required: ["section", "thresholds"],
    },

    // Модели приложения
    Survey: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60e1f1b5a2c4e314d8b0f8b1" },
        title: { type: "string", example: "Депрессия" },
        description: { type: "string", example: "Описание опроса" },
        details: { type: "string", example: "Подробности опроса" },
        time: { type: "number", example: 15 },
        results: { type: "string", example: "Результаты анализов" },
        questions: {
          type: "array",
          items: { type: "string", example: "60e1f1c0a2c4e314d8b0f8b2" },
        },
        image: { type: "string", example: "https://example.com/survey.jpg" },
        isActive: { type: "boolean", example: true },
        ranges: {
          type: "array",
          items: { $ref: "#/components/schemas/SectionRange" },
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-20T09:00:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-21T10:30:00.000Z",
        },
      },
      required: ["title", "description", "details", "time", "questions"],
    },
    Result: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60e1f2d7b3c5f415e1c3d2a4" },
        userId: { type: "string", example: "60d0fe4f5311236168a109ca" },
        surveyId: { type: "string", example: "60e1f1b5a2c4e314d8b0f8b1" },
        answers: {
          type: "array",
          items: {
            type: "object",
            properties: {
              questionId: {
                type: "string",
                example: "60e1f1c0a2c4e314d8b0f8b2",
              },
              answerId: {
                type: "string",
                example: "60e1f1d4a2c4e314d8b0f8b3",
              },
            },
            required: ["questionId", "answerId"],
          },
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-22T11:15:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-22T11:15:00.000Z",
        },
      },
      required: ["userId", "surveyId", "answers"],
    },
    Question: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60e1f1c0a2c4e314d8b0f8b2" },
        number: { type: "number", example: 1 },
        text: { type: "string", example: "Как вы себя чувствуете?" },
        section: { type: "string", example: "Эмоции" },
        answers: {
          type: "array",
          items: { type: "string", example: "60e1f1d4a2c4e314d8b0f8b3" },
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-20T09:05:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-20T09:05:00.000Z",
        },
      },
      required: ["number", "text", "answers"],
    },
    Practice: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60e1f3a0b3c5f415e1c3d2a5" },
        title: { type: "string", example: "Медитация" },
        description: { type: "string", example: "Краткое описание практики" },
        content: { type: "string", example: "Подробное содержание" },
        category: { type: "string", example: "Расслабление" },
        image: { type: "string", example: "https://example.com/practice.jpg" },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-23T12:00:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-23T12:00:00.000Z",
        },
      },
      required: ["title", "description", "content", "category"],
    },
    Organization: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60e1f4b2c3d5f526f2e4b3c6" },
        title: { type: "string", example: "Психологическая служба" },
        description: { type: "string", example: "Описание организации" },
        image: { type: "string", example: "https://example.com/org.jpg" },
        members: {
          type: "array",
          items: { type: "string", example: "60d0fe4f5311236168a109ca" },
        },
        administrators: {
          type: "array",
          items: { type: "string", example: "60d0fe4f5311236168a109cb" },
        },
        isActive: { type: "boolean", example: true },
        createdBy: { type: "string", example: "60d0fe4f5311236168a109cc" },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-24T14:00:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-24T14:00:00.000Z",
        },
      },
      required: ["title", "description", "createdBy"],
    },
    Application: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60e1f5c7d4e6f63715f5c4d7" },
        userId: { type: "string", example: "60d0fe4f5311236168a109ca" },
        organizationId: {
          type: "string",
          example: "60e1f4b2c3d5f526f2e4b3c6",
        },
        status: {
          type: "string",
          enum: ["pending", "approved", "rejected"],
          example: "pending",
        },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-25T15:30:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-25T15:30:00.000Z",
        },
      },
      required: ["userId", "organizationId"],
    },
    Answer: {
      type: "object",
      properties: {
        _id: { type: "string", example: "60e1f1d4a2c4e314d8b0f8b3" },
        number: { type: "number", example: 1 },
        text: { type: "string", example: "Немного" },
        points: { type: "number", example: 2 },
        createdAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-20T09:06:00.000Z",
        },
        updatedAt: {
          type: "string",
          format: "date-time",
          example: "2025-04-20T09:06:00.000Z",
        },
      },
      required: ["number", "text", "points"],
    },
  },
};
