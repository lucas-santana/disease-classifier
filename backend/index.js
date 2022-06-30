const express = require("express");
const fileUpload = require('express-fileupload');

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

app.post("/upload", (req, res) => {
  res.send("POST: Upload arquivo...");
  console.log(req.files.imagem);
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
