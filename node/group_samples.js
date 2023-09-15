import fs from "fs";
import { utils } from "./utils.js";
import { constants } from "buffer";

const groupBy = (objArray, key) => {
  const numValues = objArray.length;
  const groups = {};
  for (let i = 0; i < numValues; i++) {
    const val = objArray[i][key];
    if (!groups[val]) {
      groups[val] = [];
    }
    const allValues = objArray[i];
    delete allValues[key];
    groups[val].push(allValues);
    // utils.printProgress(i, numValues);
  }
  return groups;
};

const samplesStr = fs.readFileSync("../data/dataset/samples.json", "utf-8");
const samples = JSON.parse(samplesStr);

const grouped_samples = groupBy(samples, "student_id");

fs.writeFileSync("../data/dataset/grouped_data.json", JSON.stringify(grouped_samples));
console.log(grouped_samples);
