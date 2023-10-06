const mongoose = require("mongoose");

const homeworkSchema = mongoose.Schema(
  {
    teacher: {
      type: mongoose.Types.ObjectId,
      required: true,
    },

    grade: {
      type: Number,
      required: true,
    },
    subject: { type: String },

    submitted: { type: Boolean, default: false },
    Done: { type: Boolean, default: false },
    toBeCorrect: { type: Boolean, default: false },
    title: { type: String },
    questions: [
      {
        question: { type: String, required: true },
        answers: [String],
      },
    ],
    performace: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = Student = mongoose.model("Homework" /*ref*/, homeworkSchema);
