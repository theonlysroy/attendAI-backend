import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String, // cloudinary url
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
      trim: true,
    },
    teacherAbbr: {
      type: String,
      required: true,
    },
    papersAlloted: {
      type: Schema.Types.ObjectId,
      ref: "Paper",
    },
  },
  {
    timestamps: true,
  }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
