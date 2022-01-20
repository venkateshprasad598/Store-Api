const { json } = require("express");
const express = require("express");
const router = express.Router();
const Task = require("../model/schema");

router.get("/static", async (req, res) => {
  let products = await Task.find({})
    .sort("name price")
    .select("name price")
    .skip(3)
    .limit(10);

  res.status(200).json({ products, length: products.length });
});
router.get("/", async (req, res) => {
  console.log(req.query);
  const { featured, company, name, sort, field, price } = req.query;
  const obj = {};
  if (featured) {
    obj.featured = featured;
  }
  if (company) {
    obj.company = company;
  }
  if (name) {
    obj.name = { $regex: name };
  }
  if (price) {
    obj.price = { $gt: price };
  }
  const result = Task.find(obj);

  //SORTING
  // WE HAVE REMOVED AWAIT HERE BECAUSE WE HAVE TO ATTACH IT TO THE FIND FUNCTION ITSELF
  if (sort) {
    let newSort = sort.split(",").join(" ");
    result.sort(newSort);
  }

  if (field) {
    let newSort = field.split(",").join(" ");
    result.select(newSort);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result.skip(skip).limit(limit);

  let products = await result;
  res.status(200).json({ products, length: products.length });
});

module.exports = router;
