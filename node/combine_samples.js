import fs from "fs";
import { utils } from "./utils.js";

const RAW_DATA_DIR = "../data/raw";

const fileNames = fs.readdirSync(RAW_DATA_DIR);

const combinedData = [];

fileNames.forEach((fn, i) => {
  const id = i + 1;
  const content = fs.readFileSync(`${RAW_DATA_DIR}/${fn}`);
  const data = JSON.parse(content);
  combinedData.push(data);
  utils.printProgress(id, fileNames.length);
});

fs.writeFileSync(`combinedData.json`, JSON.stringify(combinedData));
