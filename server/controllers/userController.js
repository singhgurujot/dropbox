const multer = require("multer");
const detailsModel = require("../models/fileDetailsModel");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const filePath = path.resolve("./uploads/Files/");

// Methods to display directory
var Storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, path.join(__dirname, "../uploads/Files"));
  },
  filename: function (req, files, cb) {
    cb(
      null,
      files.fieldname + "-" + Date.now() + path.extname(files.originalname)
    );
  },
});
var upload = multer({
  storage: Storage,
}).array("file");

// Files Upload
exports.fileUpload = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      let file = req.files;
      var i = 0;
      for (const files of file) {
        let detailsModelDB = new detailsModel();
        detailsModelDB.fileName = files.filename;
        detailsModelDB.save(async (err, details) => {
          if (err) {
            res.send({
              status: 400,
              message: "Error while upload file details",
            });
          } else {
            i++;
            if (file.length == i) {
              res.send({
                status: 200,
                message: "Successfully upload files",
              });
            }
          }
        });
      }
    });
  } catch (error) {
    res.send({
      status: 400,
      message: "Error while upload files",
    });
  }
};

// Get Files Data
exports.getFiles = async (req, res) => {
  try {
    const getDetails = await detailsModel.find({});
    if (!getDetails) {
      res.send({
        status: 400,
        message: "No details found!",
      });
    } else {
      res.send({
        status: 200,
        message: "Successfully get details",
        result: getDetails,
      });
    }
  } catch (error) {
    res.send({
      status: 400,
      message: "Error while upload pdf file",
    });
  }
};
// Delete Files
exports.deleteFiles = async (req, res) => {
  try {
    const { id } = req.params;
    const findFile = await detailsModel.findOne({
      _id: mongoose.Types.ObjectId(id),
    });
    if (!findFile) {
        res.send({
            status: 400,
            message: "No file found!",
          });
    } else {
      const deteleFile = await detailsModel.deleteOne({
        _id: mongoose.Types.ObjectId(id),
      });
      if (!deteleFile) {
        res.send({
          status: 400,
          message: "File not exist",
        });
      } else {
        fs.unlink(filePath + "/" + findFile.fileName, (err) => {
          if (err) {
            res.send({
              status: 400,
              message: "Error while delete file from folder",
            });
          } else {
            res.send({
              status: 200,
              message: "Successfully delete file",
            });
          }
        });
      }
    }
  } catch (error) {
    res.send({
      status: 400,
      message: "Error while upload pdf file",
    });
  }
};
