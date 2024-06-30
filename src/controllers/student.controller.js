import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { matchFace, registerFace } from "../utils/faceRecognition.js";
import fs from "node:fs";
import { Student } from "../models/student.model.js";

const register_student = asyncHandler(async (req, res) => {
  // get user details (name, email, collegeRollNo, photo, password) => must
  // validation => not empty and correct format
  // check if student already exists: collegeRollNo, email
  // check for images => must
  // if not exit
  // upload the image => process it for face recognition
  // create user object -> create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return result

  const { fullName, email, collegeRollNo, password } = req.body;

  if (
    [fullName, email, collegeRollNo, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedStudent = await Student.findOne({
    $or: [{ collegeRollNo }, { email }],
  });
  if (existedStudent) {
    throw new ApiError(400, "student with college roll number already exists");
  }

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Image file is required");
  }
  let faceEncoding = null;
  try {
    faceEncoding = await registerFace(avatarLocalPath, collegeRollNo);
    if (!faceEncoding) {
      return ApiError(400, "No face detected in the image");
    }
    fs.rmSync(avatarLocalPath, (err) => {
      if (err) console.error(`Error deleting file: ${err}`);
    });
  } catch (error) {
    console.error(`Error registering student: ${error}`);
  }

  return res
    .status(201)
    .json(new ApiResponse(200, faceEncoding, "Image encoded successfully"));
});

const login_student = asyncHandler(async (req, res) => {
  const { collegeRollNo } = req.body;
  const imageFile = req.file?.path;
  const faceResult = await matchFace(imageFile);
  if (faceResult._distance < 0.6) {
    return res.status(200).json(new ApiResponse(200, "Login successful"));
  } else {
    throw new ApiError(400, "Face-id not matched");
  }
});
export { register_student, login_student };
