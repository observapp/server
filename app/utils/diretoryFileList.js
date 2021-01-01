"use strict";

const path = require("path");
const fs = require("fs");

const directoryFileListReader = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        console.error("Unable to scan directory: " + err);
        reject(err);
      }
      resolve(files);
    });
  });
};

// (async () => {
//   const directoryPath = path.join(__dirname, "../../media");
//   let files = await directoryFileListReader(directoryPath);

//   files.forEach(function (file) {
//     console.log(file);
//   });
// })();

module.exports = directoryFileListReader;
