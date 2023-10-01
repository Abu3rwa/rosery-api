const mongoose = require("mongoose");
const jobSchema = mongoose.Schema(
  [
    {
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      companyName: {
        type: String,
      },
      companyLogo: {
        type: String,
      },
      title: {
        type: String,
        required: true,
      },
      educationRequired: {
        type: String,
        // required: true,
      },
      workingDays: {
        type: [String],
        required: true,
      },
      place: {
        type: String,
        required: true,
      },
      stillVacant: {
        type: Boolean,
        default: true,
      },
      perks: {
        type: [String],
      },
      industry: {
        type: String,
        required: true,
      },
      salary: {
        type: Number,
        required: true,
      },

      shift: {
        type: String,
        required: true,
      },
      experienceRequired: {
        type: String,
        required: true,
      },
      recruitmentProcess: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },
    },
  ],
  { timestamps: true }
)
module.exports = Job = mongoose.model("Job", jobSchema)
