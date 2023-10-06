const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
// const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middlewares/authMiddleware");
const Student = require("../model/Student");
const exp = 2 * 24 * 60 * 60;
// #route: /api/students
// method   POST
// #operation: creating a new student
// #accessibility:   public
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.json(students);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// #route: /api/students
// #operation: creating a new student
// #accessibility:   public
router.post(
  "/create",
  [
    check("name", "please enter student's name").not().isEmpty(),
    check("email", "please enter an email").isEmail(),
    check("grade", "Student's grade is requireid").not().isEmpty(),
    check("age", "Student's age is requireid").not().isEmpty(),
    check("address", "Student's address is requireid").not().isEmpty(),
    check("phoneNumber", "phone mumber is requireid").not().isEmpty(),
  ],
  async (req, res) => {
    // res.send("register a new student");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, subjects, grade, phoneNumber, age, address, email, photo } =
      req.body;
    try {
      let student = await Student.findOne({ email });
      let students = await Student.find();
      if (student) {
        return res.status(400).json({ msg: "student already exists" });
      }

      student = new Student({
        ID: students.length + 1,
        name,
        subjects,
        phoneNumber,
        age,
        grade,
        address,
        email,
        photo,
      });
      // hashing student's password
      const generadedPassword = uuidv4().split("-")[0];
      const salt = await bcrypt.genSalt(10);

      student.password = await bcrypt.hash(generadedPassword, salt);
      student.access = generadedPassword;
      console.log(student.access, generadedPassword);
      await student.save();
      console.log(student);
      // generating jwt
      const payload = {
        user: {
          id: student._id,
        },
      };
      jwt.sign(
        payload,
        "process.env.JWT_SECRET_KEY",
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;

          res.status(200).json({ token, student });
        }
      );
    } catch (error) {
      console.log(error);
      //
      res.status(500).send("Server Error");
    }
  }
);
// #route:           /api/students/:id
// #operation:       deleting a student
// #accessibility:   protected
// [#note:           admins have the  access to delete students]
router.delete("/:id", authMiddleware, async (req, res) => {});

// [#route:           /api/students/:id]
// [#operation:       getting one student]
// [#accessibility:   public]
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).select("-password");
    // const student = await Student.findById("6517ba8830aeb3fc23c10ebe");
    console.log("load: ", student);
    res.status(200).json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
module.exports = router;

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     student: "mrabdu965@gmail.com",
//     pass: "lujain188965ge",
//   },
//   tls: { rejectUnauthorized: false },
// });

// router.get("/confirmation/:token", async (req, res) => {
//   try {
//     const userId = await jwt.verify(
//       req.params.token,
//       process.env.JWT_SECRET_KEY
//     ).student.id;
//     const student = await Student.findByIdAndUpdate(
//       userId,
//       { confirmed: true },
//       { new: true }
//     )(student.confirmed === true);
//     res.redirect("http://localhost:3000/login");
//   } catch (error) {}
// });

//  console.log(student.email)
//  const url = `http://localhost:8000/api/students/confirmation/${token}`
//  transporter.sendMail({
//    from: "from <carrerland000@gmail.com>",
//    to: student.email,
//    subject: "Email Confirmation",
//    html: ` <h4 style="color:red background-black">Thanks for Choosing HireLand!</h4> <br/> <h3>Please click here
//             to Confirm your Email:
//             ${url} <a href=${url}></a> </h3>`,
//  })
