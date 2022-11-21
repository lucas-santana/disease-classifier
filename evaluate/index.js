import {ModelEvaluate} from "./evaluate_single_model.js";
import * as fs from "fs";
import ObjectsToCsv from "objects-to-csv";

function standardDeviation(numArray) {
    const mean = numArray.reduce((s, n) => parseFloat(s) + parseFloat(n)) / numArray.length;
    const variance = numArray.reduce((s, n) => s + (n - mean) ** 2, 0) / (numArray.length);
    return Math.sqrt(variance);
}

let model = new ModelEvaluate();

try {
    let path = "../conversao/json/";
    if (!fs.existsSync(path)) {
        throw (`Diretório ${path} não encontrado...`);
    }
    let dirs = fs.readdirSync(path);
    if (!dirs.length > 0) {
        throw (`Diretório  ${path} vazio. Use o script converter_keras_json.ipynb para converter os modelos keras em json`);
    }

    (async function () {
        let folder = "../dataset/test";
        await model.getDataset(folder);
        let resultArray = []
        console.log(`Inciando evaluate dos modelos do diretório ${folder} \n`);

        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        let csvFileName = new Date(Date.now() - tzoffset).toISOString().replace(/T/, ' ').replace(/\..+/, '').replaceAll('-', '').replaceAll(':', '').replaceAll(' ', '');

        let accArr = [];

        let i = 1;
        for (const dir of dirs) {
            let path = "../conversao/json/" + dir;
            let files = fs.readdirSync(path);
            let modelPath = "file://" + path + "/" + files[1];

            const result = await model.evaluate(modelPath);
            console.log("Iteração: " + i++);
            console.log("Modelo: " + modelPath);
            console.log("LOSS: " + result.loss);
            console.log("ACC: " + result.acc + "\n");

            accArr.push(result.acc);

            resultArray.push({
                fileName: path,
                loss: result.loss.toString().replace(".", ","),
                acc: result.acc.toString().replace(".", ",")
            })
        }

        const soma = accArr.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
        const average = soma / accArr.length;
        const desvioPadrao = standardDeviation(accArr);

        console.log("Desvio padrão: " + desvioPadrao);

        resultArray.push({
            fileName: "",
            loss: "Média",
            acc: average
        });

        resultArray.push({
            fileName: "",
            loss: "DP",
            acc: desvioPadrao
        })

        const csv = new ObjectsToCsv(resultArray);

        // Save to file:
        await csv.toDisk("../statistics/js/" + csvFileName + ".csv");
    })();
} catch (e) {
    console.log(e)
}

/*let modelPath = "file://../conversao/json/20221121_011908_25/model.json";
let model = new ModelEvaluate();
model.getDataset("../dataset/test");

const result = await model.evaluate(modelPath);
console.log("Modelo: " + modelPath);
console.log("LOSS: " + result.loss);
console.log("ACC: " + result.acc + "\n");*/
