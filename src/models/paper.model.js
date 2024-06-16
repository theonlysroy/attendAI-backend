import mongoose, { Schema } from "mongoose";

const paperSchema = new Schema({
  paperCode: {
    type: String,
    required: [true, "Paper code is mandatory"],
    unique: true,
    trim: true,
  },
  paperName: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
});

export const Paper = mongoose.model("Paper", paperSchema);
