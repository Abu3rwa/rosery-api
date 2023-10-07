const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Student = require("../model/Student");

/* ############################################################
 @load student.....
 1. find student by the id in the auth middleware req.student.id
 2. send student to the client 
*/
router.get("/me", authMiddleware, async (req, res) => {
  try {
    console.log(req.user.id);
    const student = await Student.findById(req.user.id);
    // const student = await Student.findById("6517ba8830aeb3fc23c10ebe");
    console.log("load: ", student);
    res.status(200).json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});
/*  
@operation : login users
@route : /api/auth
@method : post
 1. find student by {email:req.body.email}.(send wrong credentials error), if there isn't a student
 2. compare the password. (send wrong credentials error)
 3. generate a token to send to client
*/

router.post(
  "/",
  [check("access", "please your access Id")],
  async (req, res) => {
    const { access } = req.body;
    // query student from the db by email
    const student = await Student.findOne({ access });
    // check if there's not a student

    if (!student) {
      return res
        .status(400)
        .json({ errors: { message: "invalid credentials" } });
    }
    // compare the req.body.password with the student's password
    // const match = await bcrypt.compare(password, student.password);
    // if (!match) {
    //   return res
    //     .status(400)
    //     .json({ errors: { message: "invalid credentials" } });
    // }
    // generate a token and send it to the client
    const payload = {
      user: {
        id: student.id,
      },
    };
    jwt.sign(
      payload,
      "process.env.JWT_SECRET_KEY",
      { expiresIn: 36000 },
      (error, token) => {
        if (error) throw error;
        res.json({ token, student });
      }
    );
  }
);
// router.post(
//   "/google",

//   async (req, res) => {
//     const { userName, email, googleId, password, isAdmin, profileType, photo } =
//       req.body;
//     let student = await Student.find({ $or: [{ googleId }, { email }] });

//     if (student) {
//       const payload = {
//         student: {
//           id: student.id,
//         },
//       };

//       jwt.sign(
//         payload,
//         process.env.JWT_SECRET_KEY,
//         { expiresIn: 36000 },
//         (error, token) => {
//           if (error) throw error;

//           res.json({ token });
//         }
//       );
//     }
//     if (!student) {
//       const newuser = {
//         userName,
//         password,
//         email,
//         googleId,
//         isAdmin,
//         profileType,
//         photo,
//       };
//       student = new Student(newuser);

//       await student.save();
//     }
//   }
// );

module.exports = router;
