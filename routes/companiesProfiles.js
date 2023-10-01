const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const Company = require("../model/Company");
const mongoose = require("mongoose")

/*  
@operation : get current company profile for current user
@route : /api/companyprofile/me
@method : get
@access : private
*/

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    if (!company) res.status(404).json("No company profile");
    res.json(company);
  } catch (error) {
    console.error(error);
  }
});

/*
@operation : create or update profile, if already exists
@route : /api/companyprofile
@method : post
@access : private
*/

router.post("/", authMiddleware, async (req, res) => {
  const {
    name,
    loc,
    area,
    logo,
    contacts,
    values,
    website,
    about,
    foundedYear,
    email,
  } = req.body
  let companyData = {}
  companyData.user = req.user.id
  if (name) companyData.name = name
  if (loc) companyData.loc = loc
  if (email) companyData.email = email
  if (area) companyData.area = area
  if (website) companyData.website = website
  if (about) companyData.about = about
  if (logo) companyData.logo = logo
  if (contacts) companyData.contacts = contacts
  if (values) companyData.values = values
  if (foundedYear) companyData.foundedYear = foundedYear
  try {
    const user = await User.findById(req.user.id)
    if (user.profileType === "company") {
      companyData.logo = user.photo
      companyData.name = user.userName

      let company = await Company.findOne({ user: req.user.id })
      if (company) {
        company = await Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: req.body },
          { new: true }
        )

        await company.save()
        return res.status(200).json(company)
      }
      company = new Company(companyData)

      await company.save()
      res.json(company)
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Server Error")
  }
})

/*
@operation : get sigle company
@route : /api/companyprofile/:id
@method : GET
@access : public
*/ router.get("/:id", async (req, res) => {
  const companyUser = mongoose.Types.ObjectId(req.params.id)
  try {
    const company = await Company.findOne({ user: companyUser })
    if (!company) return res.status(404).json("No company profile")
    res.json(company)
  } catch (error) {
    res.status(500).send("Server Error")
  }
})

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const company = await Company.findByIdAndRemove(req.params.id);
    console.log(company);
    if (!company) res.json("company not found");
    res.json("you have deleted your company profile");
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
/*
@operation : add job
@route : /api/companyprofile
@method : POST
@access : private
*/

module.exports = router;
