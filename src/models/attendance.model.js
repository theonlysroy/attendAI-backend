import mongoose, { Schema } from "mongoose";
const attendanceSchema = new Schema({
  studentID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  attendance: {
    type: Number,
    default: 0,
    required: true,
  },
});

export const Attendance = mongoose.model("Attendance", attendanceSchema);
