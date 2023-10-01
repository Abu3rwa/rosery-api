const mongoose = require("mongoose")
const postSchema = mongoose.Schema(
  [
    {
      title: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      body: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      photo: {
        type: String,
      },
      comments: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          text: {
            type: String,
            required: [true, "please provide a text for your comment"],
          },
          userName: {
            type: String,
          },
          photo: {
            type: String,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
      likes: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          userName: { type: String },
        },
      ],
    },
  ],
  { timestamps: true }
)
module.exports = Post = mongoose.model("Post", postSchema)
