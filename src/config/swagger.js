import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FlowFlix API",
      version: "1.0.0",
      description: "YouTube-like backend API documentation",
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          required: ["email", "password", "fullname", "username"],
          properties: {
            id: { type: "string", description: "User ID" },
            email: { type: "string", format: "email" },
            fullname: { type: "string" },
            username: { type: "string" },
            avatar: { type: "string", description: "Avatar URL" },
            coverImage: { type: "string", description: "Cover image URL" },
            watchHistory: {
              type: "array",
              items: { type: "string" },
              description: "List of video IDs watched",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          example: {
            id: "64efbdcbd34fae001234abcd",
            email: "user@example.com",
            fullname: "Shivam Sharma",
            username: "shivam911",
            avatar: "https://example.com/avatar.jpg",
            coverImage: "https://example.com/cover.jpg",
            watchHistory: ["64efbdcbd34fae001234abc1"],
            createdAt: "2025-07-07T09:00:00.000Z",
            updatedAt: "2025-07-07T09:00:00.000Z",
          },
        },
        Video: {
          type: "object",
          required: ["title", "videoFile"],
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            thumbnail: { type: "string" },
            videoFile: { type: "string" },
            duration: { type: "string" },
            views: { type: "integer" },
            isPublished: { type: "boolean" },
            owner: { $ref: "#/components/schemas/User" },
            createdAt: { type: "string", format: "date-time" },
          },
          example: {
            id: "64efbdcbd34fae001234abcd",
            title: "My First Video",
            description: "This is a test upload",
            thumbnail: "https://example.com/thumb.jpg",
            videoFile: "https://example.com/video.mp4",
            duration: "05:32",
            views: 1024,
            isPublished: true,
            owner: { id: "64efbdcbd34fae001234abc0", fullname: "Shivam" },
            createdAt: "2025-07-07T09:00:00.000Z",
          },
        },
        Tweet: {
          type: "object",
          required: ["content"],
          properties: {
            id: { type: "string" },
            content: { type: "string" },
            author: { $ref: "#/components/schemas/User" },
            likes: {
              type: "array",
              items: { type: "string" },
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },
        Like: {
          type: "object",
          properties: {
            id: { type: "string" },
            likedBy: { $ref: "#/components/schemas/User" },
            video: { $ref: "#/components/schemas/Video" },
            comment: { $ref: "#/components/schemas/Comment" },
            tweet: { $ref: "#/components/schemas/Tweet" },
            createdAt: { type: "string", format: "date-time" },
          },
          example: {
            id: "64efbdcbd34fae001234bbb1",
            likedBy: "64efbdcbd34fae001234abc0",
            video: "64efbdcbd34fae001234ab01",
            comment: null,
            tweet: null,
            createdAt: "2025-07-07T09:00:00.000Z",
          },
        },
        Subscription: {
          type: "object",
          properties: {
            id: { type: "string" },
            subscriber: { $ref: "#/components/schemas/User" },
            channel: { $ref: "#/components/schemas/User" },
            createdAt: { type: "string", format: "date-time" },
          },
          example: {
            id: "64efbdcbd34fae001234aa11",
            subscriber: "64efbdcbd34fae001234aaa1",
            channel: "64efbdcbd34fae001234abc0",
            createdAt: "2025-07-07T09:00:00.000Z",
          },
        },
        Playlist: {
          type: "object",
          required: ["title"],
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            videos: {
              type: "array",
              items: { $ref: "#/components/schemas/Video" },
            },
            owner: { $ref: "#/components/schemas/User" },
            createdAt: { type: "string", format: "date-time" },
          },
          example: {
            id: "64efbdcbd34fae001234abcd",
            title: "My Favourites",
            description: "Top videos to watch later",
            videos: ["64efbdcbd34fae001234ab01"],
            owner: "64efbdcbd34fae001234abc0",
            createdAt: "2025-07-07T09:00:00.000Z",
          },
        },
        Comment: {
          type: "object",
          required: ["content", "videoId"],
          properties: {
            id: { type: "string" },
            content: { type: "string" },
            videoId: { type: "string" },
            author: { $ref: "#/components/schemas/User" },
            createdAt: { type: "string", format: "date-time" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"], // Path to your route files
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
