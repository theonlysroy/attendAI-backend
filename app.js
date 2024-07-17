import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "node:fs";

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

// routes import
import studentRouter from "./src/routes/student.route.js";
import paperRouter from "./src/routes/paper.route.js";
import teacherRouter from "./src/routes/teacher.route.js";
import routineRouter from "./src/routes/routine.route.js";
import faceDataRouter from "./src/routes/faceData.route.js";
import attendanceRouter from "./src/routes/attendance.route.js";
import { getFaceDescriptorsFromBinaryData } from "./src/utils/faceRecognition.js";

// routes declaration
app.use("/auth", studentRouter);
app.use("/paper", paperRouter);
app.use("/teacher", teacherRouter);
app.use("/routine", routineRouter);
app.use("/faceData", faceDataRouter);
app.use("/attendance", attendanceRouter);

app.get("/", (req, res) => {
  res.json({
    message: "root route",
    data: "hello world",
    success: true,
  });
});

app.post("/testupload", async (req, res) => {
  const image = req.body.image;
  console.log(typeof image);
  // const imageName = `${Date.now().toString()}.png`;
  // const imagePath = `./public/uploads/${imageName}`;
  // const imageBuffer = Buffer.from(
  //   image.replace(/^data:image\/\w+;base64,/, ""),
  //   "base64"
  // );

  // fs.writeFile(imagePath, imageBuffer, (err) => {
  //   if (err) {
  //     console.error("Error saving image:", err);
  //     res.status(500).json({ message: "Error saving image" });
  //   } else {
  //     console.log("Image saved:", imageName);
  //   }
  // });

  const imageData = await getFaceDescriptorsFromBinaryData(image);
  console.log(imageData);
  res.status(200).json({ data: imageData });
});

export { app };
