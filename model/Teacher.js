const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    access: {
      type: String,
    },
    subjects: [
      {
        name: {
          type: String,
        },
        grade: {
          type: String,
        },
        bookName: {
          type: String,
        },
        homeworks: [
          {
            submitted: { type: Boolean },
            Done: { type: Boolean },
            toBeCorrect: { type: Boolean },
            title: { type: String },
            questions: [
              {
                question: { type: String, required: true },
                answers: [{ text: { type: String }, value: { type: Boolean } }],
              },
            ],
            performace: { type: Number },
          },
        ],
      },
    ],
    // academics: [
    //   {
    //     name: {
    //       type: String,
    //     },
    //     // tests: [
    //     //   { title: { type: String }, questions: [

    //     //     { type: { type: String } }
    //     //   ] },
    //     // ],

    //   },
    // ],
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

module.exports = Student = mongoose.model("student" /*ref*/, teacherSchema);
