const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

const TRAIN_FOLDER = "../dataset/train/";
const TEST_FOLDER = "../dataset/test/";

const classes = ["DRUSEN", "NORMAL"];

const N_CLASSES = 2;

function loadImages(dataDir) {
  const images = [];
  const labels = [];

  let dataDir1;
  let files;
  let filePath;
  let buffer;
  let imageTensor;

  NORMAL_DRUSEN_IMAGES = [];

  for (let j = 0; j < N_CLASSES; j++) {
    dataDir1 = dataDir + `/${classes[j]}`;
    files = fs.readdirSync(dataDir1);
    count = 0;
    for (let i = 0; i < files.length; i++) {
      if (!files[i].toLocaleLowerCase().endsWith(".jpeg")) {
        continue;
      }

      filePath = path.join(dataDir1, files[i]);

      //console.log(`Checking ${classes[j]} images..|| image = ${filePath}`);

      buffer = fs.readFileSync(filePath);

      // imageTensor = tf.node
      //   .decodeJpeg(buffer, 3)
      //   .resizeNearestNeighbor([224, 224])
      //   .toFloat()
      //   .div(tf.scalar(255.0))
      //   .expandDims();

      // tidy limpa todos os tf.Tensor s que não são retornados por uma função depois de executá-la
      // apenas o tensor retornado por expandDims() será mantido na memória
      imageTensor = tf.tidy(() => {
        return tf.node
          .decodeJpeg(buffer, 3)
          .resizeNearestNeighbor((size = [180, 180]))
          .expandDims();
      });

      console.log("numTensors: " + tf.memory().numTensors);

      images.push(imageTensor);

      labels.push(j);

      count++;
    }
    NORMAL_DRUSEN_IMAGES[j] = count;
  }

  console.log("IMAGENS DRUSEN: " + NORMAL_DRUSEN_IMAGES[0]);
  console.log("IMAGENS NORMAL: " + NORMAL_DRUSEN_IMAGES[1]);

  return [images, labels];
}

class Dataset {
  constructor() {
    this.trainData = [];
    this.testData = [];
    this.n = N_CLASSES;
  }

  // Loads training and test data.
  loadData() {
    console.log("Loading images...");
    this.testData = loadImages(TEST_FOLDER);
    console.log("Images loaded successfully.");
  }

  getTrainData() {
    return {
      images: tf.concat(this.trainData[0]),
      labels: tf.oneHot(tf.tensor1d(this.trainData[1], "int32"), this.n),
    };
  }
  async getTestData() {
    let imagesTensor = tf.concat(this.testData[0]);

    let labelTensor = tf.tensor1d(this.testData[1], "int32");
    //labelTensor = tf.oneHot(labelTensor, 2);

    // await labelTensor.array().then(array => {
    //   console.log(array)
    // })

    // await imagesTensor.array().then(array => {
    //   imagesTensor = array;
    // })

    return {
      images: imagesTensor,
      labels: labelTensor,
    };
  }
}

let dataSet = new Dataset();

async function run(epochs, batchSize, modelSavePath) {
  dataSet.loadData();
  const { images: trainImages, labels: trainLabels } = dataSet.getTrainData();
  //console.log("Training Images (Shape): " + trainImages.shape);
  //console.log("Training Labels (Shape): " + trainLabels.shape);
  model.summary();

  const validationSplit = 0.15;

  await model.fit(trainImages, trainLabels, {
    epochs,
    batchSize,
    validationSplit,
  });

  const { images: testImages, labels: testLabels } = dataSet.getTestData();

  const evalOutput = model.evaluate(testImages, testLabels);
  console.log(
    `\nEvaluation result:\n` +
      `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
      `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`
  );
  if (modelSavePath != null) {
    await model.save(`file://${modelSavePath}`);
    console.log(`Saved model to path: ${modelSavePath}`);
  }
}

async function avaliar() {
  dataSet.loadData();

  const { images: testImages, labels: testLabels } =
    await dataSet.getTestData();

  const modelo = await tf.loadLayersModel(
    "file://../conversao/20221107_041534/model.json"
  );

  const optimizer = tf.train.adam();

  modelo.compile({
    optimizer: optimizer,
    loss: "binaryCrossentropy",
    metrics: ["accuracy"],
  });

  const evalOutput = modelo.evaluate(testImages, testLabels, { batchSize: 32 });

  console.log(
    `\nEvaluation result:\n` +
      `  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; ` +
      `Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`
  );
}
avaliar();
//run(1, 32, "./model");
