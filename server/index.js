require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connect = require("./db/connect");
const router = require("./routes/index");
const seeder = require("./seeder");

const app = express();

// App middlewares
app.use(express.json()); //allow express to use json data
app.use(cookieParser()); //allow express to store and access the cookie
app.use(
  cors({
    origin: "http://localhost:3000", // frontend's origin
    credentials: true, // Allow cookies
  })
);

// App routes
app.use("/api/v1", router);

// database connection, seeder function invocation and server setting up
(async () => {
  try {
    const URL = process.env.MONGO_URI;
    const PORT = process.env.PORT || 5000;

    await connect(URL);

    console.log("MONGODB CONNECTED!!");

    // create a seeder function that trigger before starting the server and create a admin user
    await seeder();

    app.listen(PORT, () => {
      console.log(`SERVER IS UP AND RUNNING ON ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
})();

// Custom error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error",
    message: "An error occurred while processing your request",
  });
});
