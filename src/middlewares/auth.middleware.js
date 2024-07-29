import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Student } from "../models/student.model.js";

const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, [], "Unauthorized request");
    }

    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const student = await Student.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!student) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.student = student;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

const verifyAccessToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, [], "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const student = await Student.findOne({
      collegeRollNo: decodedToken?.collegeRollNo,
    }).select(
      "-_id -password -__v -refreshToken -faceDescriptor -email -createdAt -updatedAt"
    );
    if (!student) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.student = student;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export { verifyJWT, verifyAccessToken };
