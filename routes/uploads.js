const router = require("express").Router();
const multer = require("multer");
const path = require("path");

// creating the diskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cd) {
    cd(
      null,
      `${file.fieldname}-4Carrer-${Date.now()}${path.extname(
        file.originalname
      )}`
    );
  },
});
// const filterFileType = (file, cb) => {
//   const arr = [".jpg", ".jpeg", ".pgn"];
//   for (let i = 0; i < arr.length; i++) {
//     const isValid = arr[i];
//     const extname = path.extname(file.originalname);
//     if (isValid === extname) {
//       console.log(isValid === extname);
//       return cb(null, true);
//     } else {
//       cb("Photos only!");
//     }
//   }
// };
const upload = multer({
  storage,
  // fileFilter: (req, file, cb) => {
  //   filterFileType(file, cb);
  // },
});
router.post("/", upload.single("photo"), (req, res) => {
  try {
    res.status(200).json(`/${req.file.path}`);
  } catch (error) {
    res.status(500).send("Server Error")
  }
}),
  (module.exports = router);
