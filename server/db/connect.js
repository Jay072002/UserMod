const mongoose = require("mongoose");

// connection with the mongo db
const connect = async (URL) => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Mongo DB connection error");
  }
};

module.exports = connect;
