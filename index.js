const express = require("express");
const mongoose = require("mongoose");
const projectsRoutes = require("./routes/project_route");
const certificatesRoutes = require("./routes/certificate_route");
const app = express();
const dbUrl =
  "mongodb+srv://test:test1234@blogs-cluster-uwtkb.mongodb.net/collection?retryWrites=true&w=majority";

// Conncting to MongoDB
mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to DB.");
  })
  .catch((error) => {
    console.log(error);
  });

// Setting Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
// project endpoint
app.use("/api", projectsRoutes);
// certificate endpoint
app.use("/api", certificatesRoutes);
// Assigning port number
app.listen(9000);
