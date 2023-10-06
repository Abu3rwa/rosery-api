const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    grade: {
      type: Number,
    },
    admitted: { type: Boolean, default: false },
    access: {
      type: String,
    },
    subjects: [String],
    academics: [
      {
        name: {
          type: String,
        },
        // tests: [
        //   { title: { type: String }, questions: [

        //     { type: { type: String } }
        //   ] },
        // ],
        homeworks: [
          {
            submitted: { type: Boolean, default: false },
            Done: { type: Boolean, default: false },
            toBeCorrect: { type: Boolean, default: false },
            title: { type: String },
            questions: [
              {
                question: { type: String, required: true },
                answers: [{ text: { type: String }, value: { type: Boolean } }],
              },
            ],
            performace: { type: Number, default: 0 },
          },
        ],
      },
    ],
    phoneNumber: {
      type: String,
    },

    age: {
      type: Number,
    },

    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    ID: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Student = mongoose.model("student" /*ref*/, studentSchema);
