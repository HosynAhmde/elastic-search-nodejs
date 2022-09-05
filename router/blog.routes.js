const {
  createBlogs,
  getAllBlogs,
  removeBlog,
  updateBlog,
  searchByTitle,
  searchByMultiField,

  searchByRegex,
  searchMultiFieldRegex,
} = require("../controller/blog.controller");

const blogRoutre = require("express").Router();

blogRoutre.post("/create", createBlogs);
blogRoutre.get("/list/:value?", getAllBlogs);
blogRoutre.delete("/delete/:id", removeBlog);
blogRoutre.put("/update/:id", updateBlog);
blogRoutre.get("/searchByTitle", searchByTitle);
blogRoutre.get("/searchmultifield", searchByMultiField);
blogRoutre.get("/searchbyregex", searchByRegex);
blogRoutre.get("/search-milti-regex", searchMultiFieldRegex);

module.exports = { blogRoutre };
