import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Paper } from "../models/paper.model.js";

const create_paper = asyncHandler(async (req, res) => {
  const { paperCode, paperName, credits } = req.body;
  if ([paperCode, paperName, credits].some((field) => field?.trim() === "")) {
    throw new ApiError(400, [], "All fields are required");
  }
  const paper = await Paper.create({
    paperCode,
    paperName,
    credits,
  });
  if (!paper) {
    throw new ApiError(400, [], "Something went wrong while creating paper");
  }
  res.status(201).json(new ApiResponse(200, "Paper created successfully"));
});

const get_papers = asyncHandler(async (req, res) => {
  const { paperCode, paperName, credits } = req.body;
  const papers = await Paper.find();
  res
    .status(200)
    .json(new ApiResponse(200, { papers }, "Papers fetched successfully"));
});

const get_paper = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const paper = await Paper.findById(id);
  if (!paper) {
    throw new ApiError(400, "Paper not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, { paper }, "Paper fetched successfully"));
});

const update_paper = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paperCode, paperName, credits } = req.body;
  if ([paperCode, paperName, credits].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  const paper = await Paper.findById(id);
  if (!paper) {
    throw new ApiError(400, "Paper not found");
  }
  const updatedPaper = await Paper.findByIdAndUpdate(
    id,
    {
      $set: {
        paperCode,
        paperName,
        credits,
      },
    },
    {
      new: true,
    }
  );
  res.status(200).json(new ApiResponse(200, "Paper updated successfully"));
});

const delete_paper = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const paper = await Paper.findById(id);
  if (!paper) {
    throw new ApiError(400, "Paper not found");
  }
  const deletedPaper = await Paper.findByIdAndDelete(id);
  res.status(200).json(new ApiResponse(200, "Paper deleted successfully"));
});

export { create_paper, get_papers, get_paper, update_paper, delete_paper };
