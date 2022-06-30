const express = require("express");
const fileUpload = require("express-fileupload");
const tf = require("@tensorflow/tfjs-node");

var cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(fileUpload());

app.get("/", (req, res) => {
  res.send("Ola Mundo");
});

app.get("/upload", (req, res) => {
  res.send("Upload arquivo...");
});

app.post("/upload", async (req, res) => {
  const model = await tf.loadLayersModel("file://model/conversao_01_11/model.json");

  const img = req.files.imagem.data;


  tensor3D = tf.node.decodeJpeg(img, 3);

  tensor3D = tf.image.resizeNearestNeighbor(tensor3D, (size = [180, 180])).toFloat();

  tensor3D = tensor3D.expandDims();

  const prediction = model.predict(tensor3D);

  console.log(`File: ${req.files.imagem.name} Predict: ${prediction.dataSync()[0]}`);

  res.status(200).json({"predict":prediction.dataSync()[0]});
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
