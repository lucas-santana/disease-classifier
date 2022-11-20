import { ModelEvaluate } from "./evaluate_single_model.js";
import * as fs from "fs";

let model = new ModelEvaluate();

let dirs = fs.readdirSync("../conversao/json/");

if (!dirs.length > 0) {
  throw "pasta conversao/json/vazia...";
}

(async function () {
  await model.getDataset("../dataset/test");

  for (const dir of dirs) {
    let path = "../conversao/json/" + dir;
    let files = fs.readdirSync(path);
    let modelPath = "file://" + path + "/" + files[1];

    console.log("Modelo: " + modelPath + "\n");
    const teste = await model.evaluate(modelPath);
    console.log("Avaliado: " + teste + "\n");
  }
})();

// let modelPath = "file://../conversao/20221107_041534/model.json";
// let model = new ModelEvaluate();
// model.getDataset("../dataset/less");
// model.evaluate(modelPath);
