const router = require("express").Router();
const userRouter = require("./user");
const addressRouter = require("./address");
const authRouter = require("./auth");

// all routes goes here

// auth routes
router.use("/auth", authRouter);

// user routes
router.use("/user", userRouter);

// address routes
router.use("/address", addressRouter);

module.exports = router;
