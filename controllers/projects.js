const { validationResult } = require("express-validator");
const valiedUrl = require("valid-url");
const Project = require("../models/project");
var ObjectId = require('mongodb').ObjectID;
//  Get projects list
exports.getProjects = (req, res, next) => {
  Project.find()
    .then((result) => {
      if (result.length > 0) {
        res.json({
          projects: result,
        });
      } else {
        res.json({
          message: "Projects Not Found",
        });
      }
    })
    .catch((err) => console.log(err));
};
//  Add Project to DB
exports.addProject = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({
      message: "Validation failed, please check enter data.",
      error: error.array(),
    });
  }
  //  Getting values from Request Body
  const title = req.body.title;
  const description = req.body.description;
  const technologies = req.body.technologies;
  const icon = req.body.icon;
  const url = req.body.url;
  //  Set Values to model
  const project = new Project({
    title: title,
    description: description,
    icon: icon,
    url: url,
    technologies: technologies,
  });
  // Save to DB
  // Validating url get from req.body data
  if (valiedUrl.isUri(url) && valiedUrl.isUri(icon)) {
    project
      .save()
      .then((result) => {
        // adding the data into MongoDB
        res.status(201).json({
          message: "Added Successfully",
          project: result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.status(422).json({
      message: "Invalid Url Please enter valid url",
    });
  }
};

//  Delete project by ID
exports.DeleteProject = (req, res, next) => {
  const id = req.params.projectId;
  const error = validationResult(req);
  // validating id before deleting it..
  if (!error.isEmpty()) {
    return res.status(422).json({
      message: "Id size should be 24 char.",
      error: error.array(),
    });
  }
  // checking the size of the ID from request body
  if (id != null || id.length > 20) {
    Project.findByIdAndDelete({ "_id": ObjectId(id) }, (err, docs) => {
      if (err) {
        res.status(404).json({
          error: `${id} Enter valid id.`,
        });
      } else {
        console.log("success..");
      }
    })
      .then(() => {
        res.status(201).json({
          message: "project deleted.",
        });
      })
      .catch((e) => console.log(e));
  } else {
    res.json({
      error: "Please enter project id.",
    });
  }
};
