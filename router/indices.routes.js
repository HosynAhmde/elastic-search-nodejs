const express = require("express");
const {
  createNewIndex,
  getindices,
  removeindex,
} = require("../controller/indices.controller");

const indicesRouter = express.Router();

indicesRouter.post("/create", createNewIndex);

indicesRouter.get("/list", getindices);

indicesRouter.delete("/delete/:indexName", removeindex);

module.exports = { indicesRouter };
