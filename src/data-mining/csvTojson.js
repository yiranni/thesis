const csvToJson = require('convert-csv-to-json');

const fileInputName = '../data/animal-disease-summary.csv'; 
const fileOutputName = '../data/animal-disease-summary.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);