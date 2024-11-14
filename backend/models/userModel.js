const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    profimg: {
      type: String,
      default: null
    },
    role: {
      type:String,
      default:"GENERAL"
    }
  },
  {
    timestamps: true
  }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
