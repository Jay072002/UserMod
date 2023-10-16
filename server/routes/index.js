const router = require("express").Router();
const userRouter = require("./user");
const addressRouter = require("./address");

// all routes goes here
router.use("/user", userRouter);

router.use("/address", addressRouter);

module.exports = router;
