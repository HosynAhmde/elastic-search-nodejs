const express = require("express");
const { blogRoutre } = require("./blog.routes");
const { indicesRouter } = require("./indices.routes");
const AllRotes = express.Router();

AllRotes.get("/", (req, res) => {
  return res.render("pages/index", {
    message: "hi",
  });
});
AllRotes.use("/index", indicesRouter);
AllRotes.use("/blog", blogRoutre);
module.exports = { AllRotes };
