const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const mongoose = require("mongoose");
// require("./config/passport_setup")
db();

// init middlewares
// console.log(path.join(__dirname, "/uploads"));
app.use(express.json());
app.use(
  cors({
    origin: ["https://rosery-school.onrender.com", "http://localhost:3000"],
    methods: "GET, POST, PUT, DELETE, PATCH",
    credentials: true,
  })
);
// setting static folder
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")))
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"))
//   app.get("*", (req, res) => {
//     app.use(
//       express.static(path.resolve(__dirname, "client", "build", "index.html"))
//     )
//   })
// }
// middlewares routes

// app.use("/api/uploads", require("./routes/uploads"))

app.use("/api/auth", require("./routes/auth"));

app.use("/api/students", require("./routes/students"));
app.use("/api/homeworks", require("./routes/homeworks"));
app.listen(process.env.PORT || 8000, () =>
  console.log("listening to  port 8000")
);
