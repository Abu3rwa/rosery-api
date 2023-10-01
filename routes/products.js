const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Job = require("../model/Job");

const authMiddleware = require("../middlewares/authMiddleware");
const Product = require("../model/Product");

// @operation : create job
// @route : /api/jobs / @method : post / @access : private
router.post(
  "/crt",
  [
    authMiddleware,
    [
      check("name", "please provide name for this product").not().isEmpty(),
      check("description", " please write a description").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { technologies, name, launchingDate, description, reviews, image } =
      req.body;
    const productObject = {
      name,
      image,
      launchingDate,
      technologies,
      description,
      reviews,
      company: req.user.id,
    };
    try {
      let product = await Product.findOne({ name });
      if (product)
        return res
          .status(400)
          .send("this there can't be two products with the same name");
      product = new Product(productObject);
      await product.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @operation : get a single product
// @route : /api/products/gsng/prodId - @method : post - @access : public
router.get("/gsngl/:prodId", async (req, res) => {
  const product = await Product.findById(req.params.prodId);
  if (!product) return res.status(404).send("Not Found");
  res.status(200).json(product);
});
// @operation : get all products by a give company
// @route : /api/products/gsng/prodId - @method : post - @access : public
router.get("/gall/:coId", async (req, res) => {
  console.log(typeof req.params.coId);
  const products = await Product.find({ company: req.params.coId });
  console.log(products);
  res.status(200).json(products);
});
module.exports = router;
