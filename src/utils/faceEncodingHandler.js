import { spawn } from "node:child_process";
import path from "node:path";
import { BASE_PATH } from "../../module-alias.config.js";

const pythonExecutable = path.join(BASE_PATH, ".venv/bin/python");
const faceEncodingHandler = (imagePath) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn(pythonExecutable, [
      path.join(BASE_PATH, "python/face_encoder.py"),
      imagePath,
    ]);

    pythonProcess.stdout.on("data", (data) => {
      try {
        const faceEncoding = JSON.parse(data.toString());
        resolve(faceEncoding);
        console.log(faceEncoding);
      } catch (error) {
        console.error("Error parsing face encodings");
        reject("Error parsing face encodings");
      }
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(`Error processing image: ${data}`);
    });

    pythonProcess.on("close", (code) => {
      if (code != 0) {
        reject(`Python Script exited with code: ${code}`);
      }
    });
  });
};

export { faceEncodingHandler };
