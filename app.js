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

// routes declaration
app.use("/students", studentRouter);

app.get("/", (req, res) => {
  res.json({
    message: "initial project",
    data: "hello world",
    success: true,
  });
});

export { app };
