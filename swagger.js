import { version } from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "attendAI",
      version: "1.0.0",
      description:
        "Smart Attendance Management System using AI Face Recognition",
    },
  },
  apis: ["./src/routes/*.*.js"],
};

const specs = swaggerJsDoc(options);
export { specs, swaggerUi };
