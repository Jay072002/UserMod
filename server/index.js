require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connect = require("./db/connect");
const router = require("./routes/index");

const app = express();

// App middlewares
app.use(express.json());
app.use(cookieParser());

// App routes
app.use("/api/v1", router);

(async () => {
  const URL = process.env.MONGO_URI;
  const PORT = process.env.PORT;

  await connect(URL);

  console.log("MONGODB CONNECTED!!");

  app.listen(PORT, () => {
    console.log(`SERVER IS UP AND RUNNING ON ${PORT}`);
  });
})();
