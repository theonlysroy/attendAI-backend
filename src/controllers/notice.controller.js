import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Notice } from "../models/notice.model.js";

const get_all_notice = asyncHandler(async (req, res) => {
  const notice = await Notice.find().select("-_id -__v");
  return res
    .status(200)
    .json(new ApiResponse(200, notice, "Notice list fetched successfully"));
});

const get_notice_by_id = asyncHandler(async (req, res) => {
  const { noticeId } = req.params;
  const notice = await Notice.findOne({ noticeId }).select("-_id -__v");
  if (!notice) {
    return res.status(404).json(new ApiError(404, [notice], "Notice not found")); 
  }
  return res
    .status(200)
    .json(new ApiResponse(200, [notice], "Notice fetched successfully"));
});

const post_notice = asyncHandler(async (req, res) => {
  const { noticeId, title, content } = req.body;
  if (noticeId === "" || title === "" || content === "") {
    return new ApiError(400, [], "All fields are required");
  }
  const existedNotice = await Notice.findOne({ noticeId });
  if (existedNotice) {
    return new ApiError(400, [], "Notice already exists");
  }
  const notice = Notice.create({
    noticeId,
    title,
    content,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, notice, "Notice created successfully"));
});

const update_notice = asyncHandler(async (req, res) => {
  const { noticeId, title, content } = req.body;
  if (noticeId === "" || title === "" || content === "") {
    return new ApiError(400, [], "All fields are required");
  }
  const existedNotice = await Notice.findOne({ noticeId });
  if (!existedNotice) {
    return new ApiError(400, [], "Notice not found");
  }
  const notice = await Notice.findOneAndUpdate(
    { noticeId },
    {
      title,
      content,
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, notice, "Notice updated successfully"));
});

const delete_notice = asyncHandler(async (req, res) => {
  const { noticeId } = req.body;
  if (noticeId === "") {
    return new ApiError(400, [], "noticeId is required");
  }
  const existedNotice = await Notice.findOne({ noticeId });
  if (!existedNotice) {
    return new ApiError(400, [], "Notice not found");
  }
  const notice = await Notice.findOneAndDelete({ noticeId });
  return res
    .status(200)
    .json(new ApiResponse(200, notice, "Notice deleted successfully"));
});

export {
  get_all_notice,
  get_notice_by_id,
  post_notice,
  update_notice,
  delete_notice,
};
