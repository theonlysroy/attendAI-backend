import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./app.js";
import { initFaceAPI } from "./src/utils/faceRecognition.js";
dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    initFaceAPI();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙ Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection FAILED!!!", err);
  });
