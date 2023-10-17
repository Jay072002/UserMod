const { loginUser } = require("../controller/auth");

const router = require("express").Router();

// auth routes

// login user
router.post("/login", loginUser);

module.exports = router;
