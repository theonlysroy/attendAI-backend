import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Attendance } from "../models/attendance.model.js";
import { Student } from "../models/student.model.js";

const markAttendance = asyncHandler(async (req, res) => {
  const { collegeRollNo } = req.body;
  try {
    const student = await Student.findOne({ collegeRollNo: collegeRollNo });
    if (!student) {
      throw new ApiError(400, [], "Incorrect college roll");
    }
    console.log(collegeRollNo);
    console.log(student);
    const prevAttendance = await Attendance.findOne({ studentID: student._id });

    let attendanceDoc;
    if (!prevAttendance) {
      attendanceDoc = await Attendance.create({
        studentID: student._id,
        attendance: 1,
      });
    } else {
      attendanceDoc = await Attendance.findOneAndUpdate(
        prevAttendance._id,
        {
          $set: {
            attendance: prevAttendance.attendance + 1,
          },
        },
        { new: true }
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, attendanceDoc, "Attendance updated"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { markAttendance };
