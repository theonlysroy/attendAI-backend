/*
id;
startTime;
endTime;
date;
paperCode;
teacher;
createdAt;
updatedAt;
*/

import mongoose, { Schema } from "mongoose";

const routineSchema = new Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  subject: {
    type: String,
    required: true,
    default: "Comp Sc",
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

export const Routine = mongoose.model("Routine", routineSchema);
