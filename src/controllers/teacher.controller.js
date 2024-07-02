import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Teacher } from "../models/teacher.model.js";

const create_teacher = asyncHandler(async (req, res) => {
  const { fullName, email, contactNo, teacherAbbr } = req.body;
  if (
    [fullName, email, contactNo, teacherAbbr].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, [], "All fields are required");
  }
  const teacher = await Teacher.create({
    fullName,
    email,
    contactNo,
    teacherAbbr,
  });
  if (!teacher) {
    throw new ApiError(400, [], "Something went wrong while creating teacher");
  }
  res
    .status(201)
    .json(new ApiResponse(200, { teacher }, "Teacher created successfully"));
});

const get_teachers = asyncHandler(async (req, res) => {
  const { fullName, email, contactNo, teacherAbbr } = req.body;
  const teachers = await Teacher.find().select("-_id");
  res
    .status(200)
    .json(new ApiResponse(200, { teachers }, "Teachers fetched successfully"));
});

const get_teacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id).select("-_id");
  if (!teacher) {
    throw new ApiError(400, "Teacher not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, { teacher }, "Teacher fetched successfully"));
});

const update_teacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullName, email, contactNo, teacherAbbr } = req.body;
  if (
    [fullName, email, contactNo, teacherAbbr].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    throw new ApiError(400, "Teacher not found");
  }
  const updatedTeacher = await Teacher.findByIdAndUpdate(
    id,
    {
      $set: {
        fullName,
        email,
        contactNo,
        teacherAbbr,
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json(new ApiResponse(200, "Teacher updated successfully"));
});

const delete_teacher = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const teacher = await Teacher.findById(id);
  if (!teacher) {
    throw new ApiError(400, "Teacher not found");
  }
  const deletedTeacher = await Teacher.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, "Teacher deleted successfully"));
});

export {
  create_teacher,
  get_teachers,
  get_teacher,
  update_teacher,
  delete_teacher,
};
