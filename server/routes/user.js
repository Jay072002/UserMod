const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/user");
const validateUserData = require("../middlewares/validator");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/verifyToken");
const {
  createUserSchema,
  updateUserSchema,
} = require("../utils/helpers/validator");

const router = require("express").Router();

// Create User (admin only)
router.post(
  "/",
  validateUserData(createUserSchema),
  verifyTokenAndAdmin,
  createUser
);

// Get All Users (every user)
router.get("/", verifyToken, getUsers);

// Update User (admin and authorized user)
router.put(
  "/:userId",
  validateUserData(updateUserSchema),
  verifyTokenAndAuthorization,
  updateUser
);

// delete the user (admin and authorized user)
router.delete("/:userId", verifyTokenAndAuthorization, deleteUser);

// get single user (admin and authorized user)
router.get("/:userId", verifyTokenAndAuthorization, getUser);

module.exports = router;
