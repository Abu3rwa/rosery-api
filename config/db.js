// "mongodb://localhost/something",
require("dotenv").config();
const mongoose = require("mongoose");
const connentDB = async () => {
  try {
    await mongoose.connect(
      // process.env.DB_Connetion_URI,
      "mongodb://127.0.0.1/school",

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("db connected");
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
module.exports = connentDB;
