var fs = require('fs');

const tf = require('@tensorflow/tfjs-node');
const ObjectsToCsv = require('objects-to-csv');


const folderPath = 'dataset/test/DRUSEN';
const files = []

fs.readdirSync(folderPath).map(fileName => {
    files.push({'fileName':fileName,'fullPath':require('path').join(folderPath, fileName)})
})

async function classificar(filePath) {
    const model = await tf.loadLayersModel('file://conversao_01_06/model.json');

    const img = fs.readFileSync(filePath);
    tensor3D = tf.node.decodeJpeg(img,3);
    tensor3D = tf.image.resizeBilinear(tensor3D, size = [180, 180]); 
    tensor3D = tensor3D.expandDims();
    
    const prediction = model.predict(tensor3D);
    //console.log(prediction.dataSync()[0]);

    return prediction;
}

let resultData = []


Promise.all(files.map( async (file) => {
        let result = await classificar(file.fullPath)

        resultData.push({"fileName":file.fileName, "prediction":result.dataSync()[0]})
    }))

setTimeout( () => {
    //console.log(resultData)

    (async () => {
        const csv = new ObjectsToCsv(resultData);
       
        // Save to file:
        await csv.toDisk('./drusen_test.csv');
       
        // Return the CSV file as string:
        console.log(await csv.toString());
      })();
}, 2000)




