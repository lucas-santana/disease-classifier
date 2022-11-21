import * as tf from "@tensorflow/tfjs-node";
import * as fs from "fs";
import * as path from "path";

export class ModelEvaluate {
    constructor() {
        this.dataset = [];
        this.n = 2;
        this.classes = ["DRUSEN", "NORMAL"];
    }

    loadImages(dataDir) {
        console.log("Loading images...");

        const images = [];
        const labels = [];

        let dataDir1;
        let files;
        let filePath;
        let buffer;
        let imageTensor;

        let NORMAL_DRUSEN_IMAGES = [];

        for (let j = 0; j < this.n; j++) {
            dataDir1 = dataDir + `/${this.classes[j]}`;
            files = fs.readdirSync(dataDir1);
            let count = 0;
            for (let i = 0; i < files.length; i++) {
                if (!files[i].toLocaleLowerCase().endsWith(".jpeg")) {
                    continue;
                }

                filePath = path.join(dataDir1, files[i]);

                //console.log(`Checking ${this.classes[j]} images..|| image = ${filePath}`);

                buffer = fs.readFileSync(filePath);

                // tidy limpa todos os tf.Tensor s que não são retornados por uma função depois de executá-la
                // apenas o tensor retornado por expandDims() será mantido na memória
                imageTensor = tf.tidy(() => {
                    return tf.node
                        .decodeJpeg(buffer, 3)
                        .resizeNearestNeighbor([180, 180])
                        .expandDims();
                });

                //console.log("numTensors: " + tf.memory().numTensors);

                images.push(imageTensor);

                labels.push(j);

                count++;
            }
            NORMAL_DRUSEN_IMAGES[j] = count;
        }

        console.log("IMAGENS DRUSEN: " + NORMAL_DRUSEN_IMAGES[0]);
        console.log("IMAGENS NORMAL: " + NORMAL_DRUSEN_IMAGES[1]);

        console.log("Images loaded successfully.");
        return [images, labels];
    }

    /*
        * Seta o dataset carregando as imagens e criando os tensores
        * @param folder o diretório onde estão as imagens

    */
    async getDataset(folder) {
        this.dataset = this.loadImages(folder);
        this.dataset = {
            images: tf.concat(this.dataset[0]),
            labels: tf.tensor1d(this.dataset[1], "int32"),
        };
    }

    async evaluate(modelPath) {
        const {images: images, labels: labels} = this.dataset;

        const model = await tf.loadLayersModel(modelPath);

        const optimizer = tf.train.adam();

        model.compile({
            optimizer: optimizer,
            loss: "binaryCrossentropy",
            metrics: ["accuracy"],
        });

        const evalOutput = model.evaluate(images, labels, {
            batchSize: 8,
        });

        // console.log(
        //   `\nEvaluation result:\n` +
        //     `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
        //     `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`
        // );

        return {
            "loss": evalOutput[0].dataSync()[0].toFixed(3),//Loss
            "acc": evalOutput[1].dataSync()[0].toFixed(3)//Accuracy
        };
    }
}
