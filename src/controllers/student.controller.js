import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { matchFace, getFaceDescriptors } from "../utils/faceRecognition.js";
import fs from "node:fs";
import { Student } from "../models/student.model.js";
import { Face } from "../models/face.model.js";

const register_student = asyncHandler(async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    email,
    password,
    address,
    contactNo,
    department,
    session,
    uniRollNo,
    uniRegdNo,
    collegeRollNo,
  } = req.body;

  if (
    [
      fullName,
      email,
      password,
      address,
      contactNo,
      department,
      session,
      uniRollNo,
      uniRegdNo,
      collegeRollNo,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedStudent = await Student.findOne({
    $or: [{ collegeRollNo }, { email }],
  });
  if (existedStudent) {
    // throw new ApiError(400, [], "student with college roll already exists");
    res
      .status(400)
      .json({ message: "student with college roll already exists" });
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Image file is required");
  }
  const faceData = await getFaceDescriptors(avatarLocalPath);
  if (!faceData) {
    throw new ApiError(400, "No face detected in the image");
  }
  const faceDescriptor = await Face.create({ face_descriptor: faceData });
  if (!faceDescriptor) {
    throw new ApiError(400, "Database error");
  }
  const student = await Student.create({
    fullName,
    email,
    faceDescriptor,
    password,
    address,
    contactNo,
    department,
    collegeRollNo,
    uniRollNo,
    uniRegdNo,
  });
  const createStudent = await Student.findById(student._id).select(
    "-password -refreshToken"
  );
  if (!createStudent) {
    throw new ApiError(400, "something went wrong while registering student");
  }
  res.status(201).json(new ApiResponse(200, "Student registered successfully"));
});

const login_student = asyncHandler(async (req, res) => {
  const { collegeRollNo } = req.body;
  const imageFile = req.file?.path;
  if (!imageFile) {
    throw new ApiError(400, [], "Image file is required");
  }
  const studentData = await Student.aggregate([
    {
      $match: {
        collegeRollNo: `${collegeRollNo}`,
      },
    },
    {
      $lookup: {
        from: "faces",
        localField: "faceDescriptor",
        foreignField: "_id",
        as: "face_descriptor",
      },
    },
    {
      $unwind: "$face_descriptor",
    },
    {
      $project: {
        fullName: "$fullName",
        faceData: "$face_descriptor",
      },
    },
  ]);
  if (!studentData.length) {
    throw new ApiError(400, [], "Student not found");
  }
  const id = studentData[0]._id;
  const fullName = studentData[0].fullName;
  const faceMatchResults = await matchFace(
    imageFile,
    studentData[0].faceData.face_descriptor
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  const refreshToken = fullName + id + "REFRESH_TOKEN_SECRET";
  const accessToken = fullName + id + "ACCESS_TOKEN_SECRET";
  if (faceMatchResults._distance < 0.6) {
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          {
            student: { id, fullName, faceMatchResults },
          },
          "Login successful"
        )
      );
  } else {
    return res
      .status(300)
      .json(
        new ApiResponse(
          300,
          { student: { id, faceMatchResults } },
          "Face-id not matched"
        )
      );
  }
});

const logout_student = asyncHandler(async (req, res) => {
  await Student.findByIdAndUpdate(
    req.student._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

const get_studentData = asyncHandler(async (req, res) => {
  const { collegeRollNo } = req.query;
  if (!collegeRollNo) {
    throw new ApiError(400, [], "collegeRollNo is required");
  }
  const studentData = await Student.findOne({ collegeRollNo }).select(
    "-_id -password -__v -refreshToken -faceDescriptor -email -createdAt -updatedAt"
  );
  if (!studentData) {
    throw new ApiError(400, studentData, "Student not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, studentData, "Student data fetched"));
});

export { register_student, login_student, logout_student, get_studentData };
