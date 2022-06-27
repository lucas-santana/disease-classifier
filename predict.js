const fs = require("fs");

const tf = require("@tensorflow/tfjs-node");
const ObjectsToCsv = require("objects-to-csv");

const folderPath = "dataset/test/DRUSEN";
const files = [];

//ler os arquivos do diretório folderPath e armazena no array files
try {
  fs.readdirSync(folderPath).map((fileName) => {
    files.push({
      fileName: fileName,
      fullPath: require("path").join(folderPath, fileName),
    });
  });
} catch (error) {
  console.log(error);
}

/*
    Função que será chamada dentro da função predict 
*/
async function classificar(filePath) {
  const model = await tf.loadLayersModel("file://conversao_01_07/model.json");

  const img = fs.readFileSync(filePath);
  tensor3D = tf.node.decodeJpeg(img, 3);
  tensor3D = tf.image
    .resizeNearestNeighbor(tensor3D, (size = [180, 180]))
    .toFloat();
  tensor3D = tensor3D.expandDims();

  const prediction = model.predict(tensor3D);
  console.log("File: " + filePath + " Predict: " + prediction.dataSync()[0]);

  return prediction;
}

//Faz a predição para cada imagem do array files e salva no arquivo .csv
function predict() {
  let resultData = [];

  Promise.all(
    files.map(async (file) => {
      let result = await classificar(file.fullPath);
      resultData.push({
        fileName: file.fileName,
        prediction: result.dataSync()[0].toString().replace(".", ","),
      });
    })
  ).then(async () => {
    const csv = new ObjectsToCsv(resultData);

    // Save to file:
    await csv.toDisk("./drusen_test.csv");

    // Return the CSV file as string:
    console.log(await csv.toString());
  });
}
//console.log(require("path").join(folderPath, "DRUSEN-95633-1.jpeg"));
classificar(require('path').join(folderPath, 'DRUSEN-95633-1.jpeg'));
