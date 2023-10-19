const { loginUser } = require("../controller/auth");
const validateUserData = require("../middlewares/validator");
const { loginUserSchema } = require("../utils/helpers/validator");
const router = require("express").Router();

// auth routes

// login user
router.post("/login", validateUserData(loginUserSchema), loginUser);

module.exports = router;
