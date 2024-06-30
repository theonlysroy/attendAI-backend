import mongoose, { Schema } from "mongoose";
const faceSchema = new Schema(
  {
    collegeRollNo: {
      type: String,
      required: true,
    },
    face_descriptor: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Face", faceSchema);
