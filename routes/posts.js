const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Post = require("../model/Post");
const User = require("../model/Student");

const handleError = (error) => {
  const errors = {};
  if (error.message.includes("Post validation failed")) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors.msg = properties.message;
      console.log(errors);
    });
  }
  return errors;
};
router.get("/all", async (req, res) => {
  res.send("Here are all the courses you we have");
});
module.exports = router;
