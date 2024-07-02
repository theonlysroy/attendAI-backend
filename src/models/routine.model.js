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
  paperCode: {
    type: Schema.Types.ObjectId,
    ref: "Paper",
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
});

export const Routine = mongoose.model("Routine", routineSchema);
