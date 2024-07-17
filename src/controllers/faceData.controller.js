import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Student } from "../models/student.model.js";

const get_faceData = asyncHandler(async (req, res) => {
  const { collegeRollNo } = req.params;
  if (!collegeRollNo) {
    throw new ApiError(400, [], "collegeRollNo is required");
  }
  const studentData = await Student.aggregate([
    {
      $match: {
        collegeRollNo,
      },
    },
    {
      $lookup: {
        from: "faces",
        localField: "faceDescriptor",
        foreignField: "_id",
        as: "faceData",
      },
    },
    {
      $unwind: "$faceData",
    },
    {
      $project: {
        collegeRollNo: 1,
        fullName: 1,
        faceData: "$faceData.face_descriptor",
      },
    },
  ]);
  if (studentData.length === 0) {
    return res
      .status(404)
      .json(new ApiResponse(400, studentData, "No Student found"));
  } else {
    return res
      .status(200)
      .json(new ApiResponse(200, studentData, "Face Data found"));
  }
});

export { get_faceData };
