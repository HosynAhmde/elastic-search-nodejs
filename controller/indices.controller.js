const { elasticClient } = require("../config/elastic.config");

async function createNewIndex(req, res, next) {
  try {
    const { indexName } = req.body;
    if (!indexName) throw createError.BadRequest("invalid index name");
    const result = await elasticClient.indices.create({ index: indexName });
    console.log(result);
    return res.json({
      result,
      message: "index created",
    });
  } catch (error) {
    next(error);
  }
}

async function removeindex(req, res, next) {
  try {
    const { indexName } = req.params;
    const remove = await elasticClient.indices.delete({ index: indexName });
    return res.json({
      remove,
    });
  } catch (error) {
    next(error);
  }
}

async function getindices(req, res, next) {
  try {
    const indices = await elasticClient.indices.getAlias();
    return res.json({
      indices: Object.keys(indices),
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { createNewIndex, getindices, removeindex };
