import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "node:fs";
import { specs, swaggerUi } from "./swagger.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

// routes import
import studentRouter from "./src/routes/student.route.js";
import paperRouter from "./src/routes/paper.route.js";
import teacherRouter from "./src/routes/teacher.route.js";
import routineRouter from "./src/routes/routine.route.js";
import faceDataRouter from "./src/routes/faceData.route.js";
import attendanceRouter from "./src/routes/attendance.route.js";
import { getFaceDescriptorsFromBinaryData } from "./src/utils/faceRecognition.js";
import noticeRouter from "./src/routes/notice.route.js";

// routes declaration
app.use("/auth", studentRouter);
app.use("/paper", paperRouter);
app.use("/teacher", teacherRouter);
app.use("/routine", routineRouter);
app.use("/faceData", faceDataRouter);
app.use("/attendance", attendanceRouter);
app.use("/notice", noticeRouter);

app.get("/", (req, res) => {
  res.json({
    message: "root route",
    data: "hello world",
    success: true,
  });
});

export { app };
