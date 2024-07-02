import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contactNo: {
    type: String,
    required: true,
    trim: true,
  },
  teacherAbbr: {
    type: String,
    required: true,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
