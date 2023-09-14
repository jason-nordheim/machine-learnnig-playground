const constants = {};

const root = "../data";
const datasetRoot = `${root}/dataset`;
constants.DATA_DIR = root;
constants.RAW_DIR = `${root}/raw`;
constants.DATASET_DIR = datasetRoot;
constants.JSON_DIR = `${datasetRoot}/json`;
constants.IMG_DIR = `${datasetRoot}/img`;
constants.SAMPLES = `${datasetRoot}/samples.json`;

const fs = require("fs");

const fileNames = fs.readdirSync(constants.RAW_DIR);

if (!fs.existsSync(constants.DATASET_DIR)) {
  fs.mkdirSync(constants.DATASET_DIR);
}
if (!fs.existsSync(constants.JSON_DIR)) {
  fs.mkdirSync(constants.JSON_DIR);
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
  }
});

fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
