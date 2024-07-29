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
import { Routine } from "./src/models/class.model.js";

// routes declaration
app.use("/auth", studentRouter);
app.use("/paper", paperRouter);
app.use("/teacher", teacherRouter);
app.use("/routine", routineRouter);
app.use("/faceData", faceDataRouter);
app.use("/attendance", attendanceRouter);
app.use("/notice", noticeRouter);

/*
// seeding routine
const seedRoutine = async () => {
  const routine = {
    semester: 6,
    weekDays: {
      Monday: [
        {
          startTime: "02:15 PM",
          endTime: "03:45 PM",
          semester: 6,
          paperCode: "CMS-A-CC-6-13-TH",
          teacher: "OG",
        },
        {
          startTime: "03:45 PM",
          endTime: "05:15 PM",
          semester: 6,
          paperCode: "CMS-A-DSE-B-4-P",
          teacher: "MP",
        },
      ],
      Tuesday: [
        {
          startTime: "01:30 PM",
          endTime: "03:00 PM",
          semester: 6,
          paperCode: "CMS-A-DSE-B-4-TH",
          teacher: "MP",
        },
        {
          startTime: "03:00 PM",
          endTime: "04:25 PM",
          semester: 6,
          paperCode: "CMS-A-DSE-A-4-P",
          teacher: "AKG",
        },
      ],
      Wednesday: [],
      Thursday: [
        {
          startTime: "03:00 PM",
          endTime: "04:25 PM",
          semester: 6,
          paperCode: "CMS-A-DSE-B-3-P",
          teacher: "SB",
        },
      ],
      Friday: [
        {
          startTime: "11:00 AM",
          endTime: "01:30 PM",
          semester: 6,
          paperCode: "CMS-A-CC-6-14-TH",
          teacher: "PS",
        },
      ],
      Saturday: [],
    },
  };

  await Routine.deleteMany({});
  await Routine.create(routine);
};

seedRoutine();
*/

app.get("/", (req, res) => {
  res.json({
    message: "root route",
    data: "hello world",
    success: true,
  });
});

export { app };
