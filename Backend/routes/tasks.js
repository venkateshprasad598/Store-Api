const { json } = require("express");
const express = require("express");
const router = express.Router();
const Task = require("../model/schema");

router.get("/", async (req, res) => {
  const products = await Task.find({});
  console.log(products);
  res.status(200).json({ products });
  // throw new Error("ejkfbkjb kjfbjke");
});
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.send(task);
  } catch (err) {
    res.send(err);
  }
});
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(id);
});
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  res.send({ id });
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.send({ id });
});
module.exports = router;
