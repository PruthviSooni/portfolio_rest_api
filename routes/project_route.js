// const bodyParser = require("body-parser");
const bodyParser = require("body-parser");
const express = require("express");
const projectsController = require("../controllers/projects");
const router = express.Router();
const { body } = require("express-validator");

router.use(bodyParser.json());

router
  // GET /api/projects
  .get("/projects", projectsController.getProjects)
  //POst /api/projects
  .post(
    "/project",
    [
      body("title").trim().isLength({ min: 5 }),
      body("description").trim().isLength({ min: 10 }),
    ],
    projectsController.addProject
  )
  .delete("/project/:projectId", projectsController.DeleteProject);

module.exports = router;
