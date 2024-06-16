import express from "express";
import multer from "multer";
import { spawn } from "node:child_process";
import path, { basename } from "node:path";
import BASE_PATH from "./utils/basePath.js";

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("avatar"), (req, res) => {
  const imagePath = req.file?.path;
  console.log(`avatar path: ${imagePath}`);

  // call Python script to process the image
  const pythonProcess = spawn("python3", [
    path.join(BASE_PATH, "python/process_image.py"),
    imagePath,
  ]);

  pythonProcess.stdout.on("data", (data) => {
    const processedImagePath = data.toString().trim();
    console.log(path.join(BASE_PATH, processedImagePath));
    res.sendFile(path.join(BASE_PATH, processedImagePath));
    // res.send("done processing...");
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send("Error processing image");
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process exited: ${code}`);
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
    "base path": BASE_PATH,
  });
});

app.listen(port, () => {
  console.log(`⚙ Server running on http://localhost:${port}`);
});
