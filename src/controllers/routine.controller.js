import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Routine } from "../models/routine.model.js";
import { Paper } from "../models/paper.model.js";
import { Teacher } from "../models/teacher.model.js";

const create_routine = asyncHandler(async (req, res) => {
  const { startTime, endTime, date, paperCode, teacherAbbr } = req.body;
  if (
    [startTime, endTime, date, paperCode, teacherAbbr].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, [], "All fields are required");
  }
  const paper = await Paper.findOne({ paperCode });
  const teacher = await Teacher.findOne({ teacherAbbr });
  if (!paper || !teacher) {
    throw new ApiError(400, [], "Invalid paper of teacher combination");
  }
  const routine = await Routine.create({
    startTime,
    endTime,
    date,
    paperCode,
    teacher: teacherAbbr,
  });
  if (!routine) {
    throw new ApiError(400, [], "Something went wrong while creating routine");
  }
  res
    .status(201)
    .json(new ApiResponse(200, { routine }, "Routine created successfully"));
});

const get_routines = asyncHandler(async (req, res) => {
  const { startTime, endTime, date, paperCode, teacher } = req.body;
  const routines = await Routine.find({
    $or: [
      { startTime, endTime, date, paperCode, teacher },
      { startTime, endTime, date, paperCode },
      { startTime, endTime, date },
      { startTime, endTime },
      { date, paperCode, teacher },
      { date, paperCode },
      { date },
    ],
  });
  res.status(200).json(new ApiResponse(200, "Routines fetched successfully"));
});

const get_routine = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const routine = await Routine.findById(id);
  if (!routine) {
    throw new ApiError(400, "Routine not found");
  }
  res.status(200).json(new ApiResponse(200, "Routine fetched successfully"));
});

const update_routine = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { startTime, endTime, date, paperCode, teacher } = req.body;
  if (
    [startTime, endTime, date, paperCode, teacher].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const routine = await Routine.findById(id);
  if (!routine) {
    throw new ApiError(400, "Routine not found");
  }
  const updatedRoutine = await Routine.findByIdAndUpdate(
    id,
    {
      $set: {
        startTime,
        endTime,
        date,
        paperCode,
        teacher,
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json(new ApiResponse(200, "Routine updated successfully"));
});

const delete_routine = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const routine = await Routine.findById(id);
  if (!routine) {
    throw new ApiError(400, "Routine not found");
  }
  const deletedRoutine = await Routine.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, "Routine deleted successfully"));
});

export {
  create_routine,
  get_routines,
  get_routine,
  update_routine,
  delete_routine,
};
