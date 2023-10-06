const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const Homework = require("../model/Homework");

///////////////////////////////
router.get("/", async (req, res) => {
  console.log(req.query);
  const { grade, subject } = req.query;
  try {
    const homeworks = await Homework.find({ grade, subject });
    if (!homeworks.length > 0) return res.status(404).send("No Homeworks");
    res.json(homeworks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});
router.get("/subject=English&grade=5", async (req, res) => {
  try {
    const homeworks = await Homework.findOne({});

    res.json(homeworks);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// #route: /api/students
// #operation: creating a new homework
// #accessibility:   public
router.post(
  "/create",
  //   [
  //     check("name", "please enter homework's name").not().isEmpty(),
  //     check("email", "please enter an email").isEmail(),
  //     check("level", "Homework's level is requireid").not().isEmpty(),
  //     check("age", "Homework's age is requireid").not().isEmpty(),
  //     check("address", "Homework's address is requireid").not().isEmpty(),
  //     check("phoneNumber", "phone mumber is requireid").not().isEmpty(),
  //   ],
  authMiddleware,
  async (req, res) => {
    const { title, subject, grade, questions } = req.body;
    console.log(title);
    try {
      const homework = await Homework.findOne({ title, grade, subject });

      if (homework) {
        return res.status(400).json({ msg: "homework already exists" });
      }
      let newHomework = new Homework({ title, subject, grade, questions });
      newHomework.teacher = req.user.id;
      console.log("homework: ", newHomework);

      await newHomework.save();
      res.status(200).send(newHomework);
    } catch (error) {
      console.log(error);
      //
      res.status(500).send("Server Error");
    }
  }
);
// #route:           /api/students/:id
// #operation:       deleting a homework
// #accessibility:   protected
// [#note:           admins have the  access to delete students]
router.delete("/:id", authMiddleware, async (req, res) => {});

// [#route:           /api/students/:id]
// [#operation:       getting one homework]
// [#accessibility:   public]
router.get("/:id", async (req, res) => {
  try {
    const homework = await Homework.findById(req.params.id).select("-password");
    // const homework = await Homework.findById("6517ba8830aeb3fc23c10ebe");
    console.log("load: ", homework);
    res.status(200).json(homework);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
module.exports = router;
