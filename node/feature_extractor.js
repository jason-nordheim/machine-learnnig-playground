import { constants } from "buffer";
import fs from "fs";
import { pathCount, pointCount } from "jn-drawing-common";

const INPUT_DIR = "../data/dataset/combinedData.json";
const OUTPUT_DIR = "../data/dataset/analyzedData.json";
const samples = JSON.parse(fs.readFileSync(INPUT_DIR));

const numFiles = samples.length;

const featuresArr = [];
for (let i = 0; i < numFiles; i++) {
  const session_id = samples[i].session;
  const drawings = Object.entries(samples[i].drawings);
  let path_count = 0;
  let point_count = 0;
  for (let j = 0; j < drawings.length; j++) {
    const [label, data] = drawings[j];
    path_count += pathCount(data);
    point_count += pointCount(data);
    featuresArr.push({
      path_count,
      point_count,
      session_id,
      label,
    });
  }
}

fs.writeFileSync(OUTPUT_DIR, JSON.stringify(featuresArr));
