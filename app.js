import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes import
import studentRouter from "./src/routes/student.route.js";
import paperRouter from "./src/routes/paper.route.js";
import teacherRouter from "./src/routes/teacher.route.js";
import routineRouter from "./src/routes/routine.route.js";

// routes declaration
app.use("/student", studentRouter);
app.use("/paper", paperRouter);
app.use("/teacher", teacherRouter);
app.use("/routine", routineRouter);

app.get("/", (req, res) => {
  res.json({
    message: "root route",
    data: "hello world",
    success: true,
  });
});

export { app };
