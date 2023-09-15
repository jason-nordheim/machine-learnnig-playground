import { createCanvas } from "canvas";
import { drawPaths } from "../common/dist/main.js";
import { utils } from "./utils.js";
import fs from "fs";

const constants = {};

const root = "../data";
const datasetRoot = `${root}/dataset`;
constants.DATA_DIR = root;
constants.RAW_DIR = `${root}/raw`;
constants.DATASET_DIR = datasetRoot;
constants.JSON_DIR = `${datasetRoot}/json`;
constants.IMG_DIR = `${datasetRoot}/img`;
constants.SAMPLES = `${datasetRoot}/samples.json`;

const fileNames = fs.readdirSync(constants.RAW_DIR);

if (!fs.existsSync(constants.DATASET_DIR)) {
  fs.mkdirSync(constants.DATASET_DIR);
}
if (!fs.existsSync(constants.JSON_DIR)) {
  fs.mkdirSync(constants.JSON_DIR);
}
if (!fs.existsSync(constants.IMG_DIR)) {
  fs.mkdirSync(constants.IMG_DIR);
}

const samples = [];
fileNames.forEach((fn, i) => {
  const id = i + 1;
  const content = fs.readFileSync(`${constants.RAW_DIR}/${fn}`);
  const { session, student, drawings } = JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    });

    fs.writeFileSync(`${constants.JSON_DIR}/${id}.json`, JSON.stringify(drawings[label]));

    generateImageFile(`${constants.IMG_DIR}/${id}.png`);

    utils.printProgress(id, fileNames.length * 8);
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));

function generateImageFile(filePath, paths) {
  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");
  drawPaths(ctx, paths);
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(filePath, buffer);
}
