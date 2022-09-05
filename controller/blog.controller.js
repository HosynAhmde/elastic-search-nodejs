const createError = require("http-errors");
const { elasticClient } = require("../config/elastic.config");
const indexBlog = "blog";
async function createBlogs(req, res, next) {
  try {
    const { title, text, author } = req.body;
    const createdResult = await elasticClient.index({
      index: indexBlog,
      document: { text, title, author },
    });
    return res.json({
      createdResult,
    });
  } catch (error) {
    next(error);
  }
}

async function getAllBlogs(req, res, next) {
  try {
    const value = req.params.value;
    const blogs = await elasticClient.search({
      index: indexBlog,
      q: value,
    });
    // return res.json({ blogs });
    return res.json(blogs.hits.hits);
  } catch (error) {
    next(error);
  }
}

async function removeBlog(req, res, next) {
  try {
    const { id } = req.params;
    const deletedResult = await elasticClient.deleteByQuery({
      index: indexBlog,
      query: {
        match: {
          _id: id,
        },
      },
    });
    return res.json({
      deletedResult,
    });
  } catch (error) {
    next(error);
  }
}

async function updateBlog(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;
    const updateResult = await elasticClient.update({
      index: indexBlog,
      id,
      doc: data,
    });
    return res.json({
      updateResult,
    });
  } catch (error) {
    next(error);
  }
}

async function searchByTitle(req, res, next) {
  try {
    const { title } = req.query;
    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        match: {
          title,
        },
      },
    });
    return res.json(result.hits.hits);
  } catch (error) {
    next(error);
  }
}

async function searchByMultiField(req, res, next) {
  try {
    const { search } = req.query;
    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        multi_match: {
          query: search,
          fields: ["title", "text"],
        },
      },
    });
    return res.json(result.hits.hits);
  } catch (error) {
    next(error);
  }
}

async function searchByRegex(req, res, next) {
  try {
    const { search } = req.query;

    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        regexp: {
          text: `.*${search}.*`,
        },
      },
    });

    return res.json(result.hits.hits);
  } catch (error) {
    next(error);
  }
}

async function searchMultiFieldRegex(req, res, next) {
  try {
    const { search } = req.query;

    const result = await elasticClient.search({
      index: indexBlog,
      query: {
        bool: {
          should: [
            { regexp: { text: `.*${search}.*` } },
            { regexp: { title: `.*${search}.*` } },
            {
              regexp: { author: `.*${search}.*` },
            },
          ],
        },
      },
    });

    return res.json(result.hits.hits);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBlogs,
  createBlogs,
  removeBlog,
  updateBlog,
  searchByTitle,
  searchByMultiField,
  searchByRegex,
  searchMultiFieldRegex,
};
