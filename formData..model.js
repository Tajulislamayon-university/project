const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    dob: {
      type: String,
    },
    subjectArea: {
      type: String,
    },
    marketingUpdates: {
      type: Boolean,
    },
    correspondenceWelsh: {
      type: Boolean,
    },
  },
  {
    strict: false,
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("FormData", userSchema);
