import * as tfjs from "@tensorflow/tfjs-node";
import * as faceapi from "@vladmandic/face-api";
import fs from "node:fs";
import { join } from "node:path";
import { BASE_PATH } from "../../module-alias.config.js";
import Face from "../models/face.model.js";
import Student from "../models/student.model.js";
import { ApiError } from "./ApiError.js";

let optionsSSDMobileNet;
const minConfidence = 0.1;
const modelPath = join(BASE_PATH, "public/models");
const thresholdDistance = 0.5;

// load the face detection models
async function initFaceAPI() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath);
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath);
  await faceapi.nets.faceExpressionNet.loadFromDisk(modelPath);
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath);
  optionsSSDMobileNet = new faceapi.SsdMobilenetv1Options({
    minConfidence,
    maxResults: 1,
  });
}

// detect face and get the face descriptors
async function getFaceDescriptors(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  const tensor = tfjs.node.decodeImage(buffer, 3);
  const face = await faceapi
    .detectSingleFace(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceDescriptor();

  return face;
}

// register the face with college roll no in the database
async function registerFace(imagePath, collegeRollNo) {
  const faceDescriptor = await getFaceDescriptors(imagePath);
  let face = null;
  if (faceDescriptor) {
    face = Face.create({
      collegeRollNo,
      face_descriptor: faceDescriptor,
    });
  }
  return face;
}

// match the face with the database encodings
async function matchFace(inputFile) {
  let face = await Face.findOne({ collegeRollNo });
  let student = await Student.findOne({ collegeRollNo });
  if (!face) {
    throw new ApiError(400, "Student not found");
  }
  face.face_descriptor = new Float32Array(Object.values(face.face_descriptor));
  face = new faceapi.LabeledFaceDescriptors(student.fullName, [
    face.face_descriptor,
  ]);
  const matcher = new faceapi.FaceMatcher(face, thresholdDistance);
  const newDescriptor = await getFaceDescriptors(inputFile);
  const result = await matcher.findBestMatch(newDescriptor);
  return result;
}
export { initFaceAPI, registerFace, matchFace };
