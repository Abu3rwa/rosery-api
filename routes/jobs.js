const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Job = require("../model/Job")
const mongoose = require("mongoose")

const authMiddleware = require("../middlewares/authMiddleware")

// @operation : create job
// @route : /api/jobs / @method : post / @access : private
router.post(
  "/",
  [
    authMiddleware,
    [
      check("title", "title is required").not().isEmpty(),
      check("salary", " please provide a rough salary").not().isEmpty(),
      check("shift", "what is the Job shift? full-time or part-time")
        .not()
        .isEmpty(),
      check("place", "Choose a place of work").not().isEmpty(),
      // check(
      //   "educationRequired ",
      //   "what is the education required for this job?"
      // ).not()
      //   .isEmpty(),
      check("workingDays", "what are the work days?").not().isEmpty(),
      check("recruitmentProcess", "what is the process of recruitment")
        .not()
        .isEmpty(),
      check("description", "description is required?").not().isEmpty(),
      check("experienceRequired", "experience is required is required?")
        .not()
        .isEmpty(),
      check("industry", "please choose an Industry").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    const {
      perks,
      recruitmentProcess,
      description,
      experienceRequired,
      title,
      salary,
      shift,
      industry,
      educationRequired,
      workingDays,
      stillVacant,
      place,
    } = req.body

    const jobObject = {}
    jobObject.company = req.user.id
    if (recruitmentProcess) jobObject.recruitmentProcess = recruitmentProcess
    if (experienceRequired) jobObject.experienceRequired = experienceRequired
    if (description) jobObject.description = description
    if (industry) jobObject.industry = industry
    if (salary) jobObject.salary = salary
    if (educationRequired) jobObject.educationRequired = educationRequired
    if (stillVacant) jobObject.stillVacant = stillVacant
    if (place) jobObject.place = place
    if (shift) jobObject.shift = shift
    if (title) jobObject.title = title
    if (workingDays)
      jobObject.workingDays = workingDays.split(",").map((perk) => {
        return perk.trim()
      })
    if (perks)
      jobObject.perks = perks.split(",").map((perk) => {
        return perk.trim()
      })
    console.log(jobObject.workingDays)
    try {
      const user = await User.findById(req.user.id)
      jobObject.companyLogo = user.photo
      jobObject.companyName = user.userName
      let job = await Job.findOne({ company: req.user.id })
      job = new Job(jobObject)
      await job.save()
      res.json(job)
    } catch (error) {
      console.error(error)
      res.status(500).send("Server Error")
    }
  }
)
// @operation : update job
// @route : /api/jobs / @method : put /@access : private
router.put(
  "/:id",
  [
    authMiddleware,
    [
      check("title", "title is required").not().isEmpty(),
      check("salary", " please provide a rough salary").not().isEmpty(),
      check("shift", "what kind of shift of this job? full-time or part-time")
        .not()
        .isEmpty(),
      check("recruitmentProcess", "what is the process of recruitment")
        .not()
        .isEmpty(),
      check("description", "description is required?").not().isEmpty(),
      check("experienceRequired", "experience is required is required?")
        .not()
        .isEmpty(),
      check("industry", "please choose an Industry").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      console.log(errors)
      return res.status(400).json({ errors: errors.array() })
    }
    try {
      const job = await Job.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      console.log(job)
      res.json(job)
    } catch (error) {
      console.error(error)
    }
  }
)
// @operation : get all jobs of a particular company
// @route : /api/jobs @method : get @access : public
router.get("/company/:id", async (req, res) => {
  const jobCompany = mongoose.Types.ObjectId(req.params.id)

  const jobs = await Job.find({ company: jobCompany })

  res.json(jobs)
})
// @operation : search for jobs
// @route : /api/jobs @method : get @access : public
// router.get("/", async (req, res) => {
//   const {q} =  req.query
//   const jobs = await Job.find({ $regex: q}).limit(3)
//   res.json(jobs)
// })
// @operation : get all jobs
// @route : /api/jobs /@method : get /@access : public
router.get("/", async (req, res) => {
  const jobs = await Job.find().sort({ createdAt: -1 })
  res.json(jobs)
})
router.get("/hightPaying", async (req, res) => {
  const jobs = await Job.find().sort({ salary: -1 })
  res.json(jobs)
})
// @operation : get a single job
// @route : /api/jobs /@method : get /@access : public
router.get("/job/:id", async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id })
    if (!job) throw new Error({ errors: { msg: "Job Not found" } })
    res.json(job)
  } catch (error) {
    if (error.name === "CastError")
      res.json({ errors: { msg: "Job Not found" } })
    res.status(500).send(error)
  }
})
// @operation :delete a single job
// @route : /api/jobs /@method : delete /@access : private
router.delete("/job/:id", async (req, res) => {
  const job = await Job.findById(req.params.id)
  if (!job) return res.status(404).send("No Job to Delete")
  await Job.findByIdAndRemove(req.params.id)
  res.status(200).send("job was delete successfully")
})

module.exports = router;
