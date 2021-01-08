const bodyParser = require("body-parser");
const express = require("express");
const certificatesController = require("../controllers/certificates");
const router = express.Router();
const { body } = require("express-validator");

router.use(bodyParser.json());
router
  //GET /api/certificates
  .get(
    "/certificates",
    [body("courseName").trim().isLength({ min: 5 })],
    certificatesController.getCertificates
  )
  //POST /api/certificates
  .post("/certificate", certificatesController.addCertificates)
  // DELETE /api/certificates
  .delete(
    "/certificate/:certificateId",
    certificatesController.deleteCertificate
  );
module.exports = router;
