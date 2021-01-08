const Certificates = require("../models/certificates");
const validUrl = require("valid-url");
const { validationResult } = require("express-validator");
//Get Certificates
exports.getCertificates = (req, res, next) => {
  Certificates.find()
    .then((result) => {
      if (result.length > 0) {
        res.json({ certificates: result });
      } else {
        res.json({
          message: "Certificates Not Found",
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

// Add Certificates
exports.addCertificates = (req, res, next) => {
  const courseName = req.body.courseName;
  const courseURL = req.body.courseURL;
  const courseImg = req.body.courseImg;
  //set Values to model
  const certificates = new Certificates({
    courseName: courseName,
    courseURL: courseURL,
    courseImg: courseImg,
  });
  //// validating url from request body..
  if (validUrl.isUri(courseImg) && validUrl.isUri(courseURL)) {
    certificates
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Added Successfully",
          certificates: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(422).json({
      message: "Enter valid URL.",
    });
  }
};

exports.deleteCertificate = (req, res, next) => {
  const id = req.params.certificateId;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      message: "invalid id please check id.",
      error: error.array(),
    });
  }
  // checking the size of the ID from request body
  if (id != null || id.length > 20) {
    Certificates.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        res.status(404).json({
          error: `${id} Enter valid id.`,
        });
      }
    })
      .then(() => {
        res.status(201).json({
          message: "certificates deleted.",
        });
      })
      .catch((e) => console.log(e));
  } else {
    res.json({
      error: "Please enter certificate id.",
    });
  }
};
