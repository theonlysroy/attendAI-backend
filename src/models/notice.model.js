import mongoose, { Schema } from "mongoose";

const NoticeSchema = new Schema(
  {
    noticeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Notice = mongoose.model("Notice", NoticeSchema);
