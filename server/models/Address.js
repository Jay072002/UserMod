const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: Number,
    maxLength: 6,
  },
  state: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;
