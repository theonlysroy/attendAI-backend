import { version } from "mongoose";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student Attendance Management",
      version: "1.0.0",
      description:
        "Using Face-Recognition features to automate attendance management",
    },
  },
  apis: ["./src/routes/*.*.js"],
};

const specs = swaggerJsDoc(options);
export { specs, swaggerUi };
