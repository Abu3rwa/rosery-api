const mongoose = require("mongoose");
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    description: {
      required: true,
      type: String,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        description: { type: String },
      },
    ],
    technologies: {
      type: Array,
    },
    image: {
      // required: true,
      type: String,
    },
    launchingDate: {
      required: true,
      type: Date,
    },
  },

  { timeStamps: true }
);
module.exports = mongoose.model("Products", productSchema);
