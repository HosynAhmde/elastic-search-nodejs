const express = require("express");
const app = express();
const path = require("path");
const server = require("http").createServer(app);
require("dotenv").config();
const expressEjsLayouts = require("express-ejs-layouts");
const { AllRotes } = require("./router/router");
const { elasticClient } = require("./config/elastic.config");

// elasticClient.indices.getAlias();

//Middlware Config
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use(AllRotes);

app.use((req, res, next) => {
  return res.status(404).json({
    status: 404,
    message: "not found",
  });
});

//Error Handeling
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`server run on port ${process.env.PORT}`);
});
