const mongoose = require("mongoose");
const comapySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    name: {
      type: String,
    },
    loc: {
      type: String,
    },

    contacts: {
      emails: {
        type: Array,
      },
      phones: {
        type: Array,
      },
    },
    area: {
      type: String,
    },
    // products: [
    //   {
    //     name: {
    //       type: String,
    //     },
    //     description: {
    //       type: String,
    //     },
    //     reviews: {
    //       type: String,
    //     },
    //     technologies: {
    //       type: Array,
    //     },
    //   },
    // ],
    // services: {
    //   type: Array,
    // },
    foundedYear: {
      type: Date,
    },
    logo: {
      type: String,
    },

    about: {
      type: String,
    },
    values: {
      type: String,
    },

    website: {
      type: String,
    },
  },

  { timeStamps: true }
)
module.exports = mongoose.model("Company", comapySchema);
