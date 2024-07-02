import mongoose, { Schema } from "mongoose";
const faceSchema = new Schema({
  face_descriptor: {
    type: Object,
    required: true,
  },
});

export const Face = mongoose.model("Face", faceSchema);
