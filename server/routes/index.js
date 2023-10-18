const router = require("express").Router();
const userRouter = require("./user");
const addressRouter = require("./address");
const authRouter = require("./auth");

// App routes goes here

// auth related routes
router.use("/auth", authRouter);

// user related routes
router.use("/user", userRouter);

// address related routes
router.use("/address", addressRouter);

module.exports = router;
