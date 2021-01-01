"use strict";

const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const directoryFileListReader = require("../utils/diretoryFileList");
const path = require("path");

router.use(fileUpload());

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/list", async (req, res) => {
  try {
    const directoryPath = path.join(__dirname, "../../media");
    let files = await directoryFileListReader(directoryPath);

    return res.status(200).send(files);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server Error");
  }
});

router.get("/:id", (req, res) => {
  console.log(req.params.id);

  let filePath = `./media/${req.params.id}`;

  let stat = fs.statSync(filePath);
  let total = stat.size;
  if (req.headers.range) {
    let range = req.headers.range;
    let parts = range.replace(/bytes=/, "").split("-");
    let partialstart = parts[0];
    let partialend = parts[1];

    let start = parseInt(partialstart, 10);
    let end = partialend ? parseInt(partialend, 10) : total - 1;
    let chunksize = end - start + 1;
    let readStream = fs.createReadStream(filePath, { start: start, end: end });
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    });
    readStream.pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": total,
      "Content-Type": "audio/mpeg",
    });
    fs.createReadStream(filePath).pipe(res);
  }

  // return res.status(200).send(`Got ${req.params.id}`);
  // return res.status(500).send('Server Error');
});

router.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }

  const myFile = req.files.file;

  myFile.mv(`./media/${myFile.name}`, function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send({ msg: "Error occured" });
    }
    // returing the response with file path and name
    return res.send({ name: myFile.name, path: `/${myFile.name}` });
  });
});

module.exports = router;
