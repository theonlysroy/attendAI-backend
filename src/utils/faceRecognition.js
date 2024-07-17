import * as tfjs from "@tensorflow/tfjs-node";
import * as faceapi from "@vladmandic/face-api";
import fs from "node:fs";
import { join } from "node:path";
import { BASE_PATH } from "../../module-alias.config.js";
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
  const faceDescriptor = await faceapi
    .detectSingleFace(tensor, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceDescriptor();

  return faceDescriptor.descriptor;
}

async function getFaceDescriptorsFromBinaryData(base64ImageData) {
  const base64Image = base64ImageData.replace(/^data:image\/\w+;base64,/, "");
  const faceDescriptor = await faceapi
    .detectSingleFace(img, optionsSSDMobileNet)
    .withFaceLandmarks()
    .withFaceDescriptor();

  return faceDescriptor.descriptor;
}

// match the face with the database encodings
async function matchFace(inputFile, faceDescriptor) {
  faceDescriptor = new Float32Array(Object.values(faceDescriptor));
  const matcher = new faceapi.FaceMatcher(faceDescriptor, thresholdDistance);
  const inputImageDescriptor = await getFaceDescriptors(inputFile);
  const result = await matcher.findBestMatch(inputImageDescriptor);
  return result;
}
export {
  initFaceAPI,
  getFaceDescriptors,
  matchFace,
  getFaceDescriptorsFromBinaryData,
};
