import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Routine } from "../models/class.model.js";
import { Paper } from "../models/paper.model.js";
import { Teacher } from "../models/teacher.model.js";

const create_routine = asyncHandler(async (req, res) => {
  const { startTime, endTime, date, subject, paperCode, teacherAbbr } =
    req.body;
  if (
    [startTime, endTime, date, paperCode, teacherAbbr].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, [], "All fields are required");
  }
  const paper = await Paper.find({ paperCode }).select("-paperCode, -credits");
  const teacher = await Teacher.find({ teacherAbbr }).select(
    "-email -contactNo -teacherAbbr"
  );
  if (!paper || !teacher) {
    throw new ApiError(400, [], "Invalid paper or teacher combination");
  }
  const routine = await Routine.create({
    startTime,
    endTime,
    date,
    subject,
    paperCode,
    teacher: teacherAbbr,
  });
  if (!routine) {
    throw new ApiError(400, [], "Something went wrong while creating routine");
  }
  res.status(201).json(
    new ApiResponse(
      200,
      {
        routine,
      },
      "Routine created successfully"
    )
  );
});

const get_routine_by_day = asyncHandler(async (req, res) => {
  const { semester, day } = req.query;
  // const lookupStage = {
  //   $lookup: {
  //     from: "paper",
  //     localField: `weekDays.${day}.paperCode`,
  //     foreignField: "paperCode",
  //     as: "paperDetails",
  //   },
  // };
  // const aggregateQuery = [
  //   {
  //     $match: {
  //       semester: semester,
  //     },
  //   },
  //   {
  //     $project: {
  //       _id: 0,
  //       [`weekDays.${day}`]: 1,
  //     },
  //   },
  //   {
  //     $unwind: `$weekDays.${day}`,
  //   },
  //   lookupStage,
  //   {
  //     $unwind: "$paperDetails",
  //   },
  //   {
  //     $addFields: {
  //       [`weekDays.${day}.paperName`]: "$paperDetails.paperName",
  //     },
  //   },
  //   {
  //     $project: {
  //       [`weekDays.${day}`]: 1,
  //     },
  //   },
  // ];

  const projectQuery = {
    $project: {
      _id: 0,
      [`weekDays.${day}`]: 1,
    },
  };

  const aggregateQuery = [
    {
      $match: {
        semester: semester,
      },
    },
    projectQuery,
  ];
  const routine = await Routine.aggregate(aggregateQuery);
  if (!routine) {
    throw new ApiError(400, [], "Routine not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, { routine }, "Routine fetched successfully"));
});

const get_routines = asyncHandler(async (req, res) => {
  const routines = await Routine.aggregate([
    { $match: { semester: 6 } },
    {
      $project: {
        __v: 0,
        _id: 0,
      },
    },
  ]);
  if (!routines)
    res.status(501).json(new ApiResponse(501, "Internal Server Error"));
  else {
    res.status(200).json(routines);
  }
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
  get_routine_by_day,
  update_routine,
  delete_routine,
};
