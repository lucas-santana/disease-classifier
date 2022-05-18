var fs = require('fs');
// var files = fs.readdirSync('test/');
// console.log(files);


const tf = require('@tensorflow/tfjs-node');

async function classificar() {
    const model = await tf.loadLayersModel('file://conversao_01_06/model.json');
    //const imgDrusen = document.getElementById('img1');

    const imgDrusen = fs.readFileSync('dataset/val/DRUSEN/DRUSEN-9928043-1.jpeg');
    tensor3DDrusen = tf.node.decodeJpeg(imgDrusen,3)
    tensor3DDrusen = tf.image.resizeBilinear(tensor3DDrusen, size = [180, 180]); // can also use tf.image.resizeNearestNeighbor
    tensor3DDrusen = tensor3DDrusen.expandDims()
    
    // console.log(tensor3DDrusenResized)
    // const tensor4DDrusen = tensor3DDrusenResized.reshape([1, 180, 180, 3])
    // console.log(tensor4DDrusen)

    const predictionDrusen = model.predict(tensor3DDrusen);
    console.log(predictionDrusen.dataSync()[0]);

    // console.log("Imagem: " + imgDrusen.name + " \nPredict: " + predictionDrusen.dataSync()[0]);


    // const imgNormal = document.getElementById('img2');

    // const tensor3DNormal = tf.browser.fromPixels(imgNormal);//Creates a tf.Tensor from an image.
    // const tensor4DNormal = tensor3DNormal.reshape([1, 180, 180, 3])

    // const predictionNormal = model.predict(tensor4DNormal);
    // console.log(predictionNormal);

    // console.log("Imagem: " + imgNormal.name + " \nPredict: " + predictionNormal.dataSync()[0]);
}

classificar();

