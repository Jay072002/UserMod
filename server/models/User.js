const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
    default: undefined,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
