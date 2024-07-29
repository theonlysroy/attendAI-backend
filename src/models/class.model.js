import mongoose, { Schema } from "mongoose";

const classSchema = new Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  paperCode: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
});

const routineSchema = new Schema({
  semester: {
    type: Number,
    required: true,
  },
  weekDays: {
    Monday: { type: [classSchema] },
    Tuesday: { type: [classSchema] },
    Wednesday: { type: [classSchema] },
    Thursday: { type: [classSchema] },
    Friday: { type: [classSchema] },
    Saturday: { type: [classSchema] },
  },
});

export const Routine = mongoose.model("Routine", routineSchema);
