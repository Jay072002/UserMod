const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/user");
const {
  verifyTokenAndAdmin,
  verifyTokenAndUser,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// Create User (admin only)
router.post("/", verifyTokenAndAdmin, createUser);

// Get All Users (every user)
router.get("/", verifyToken, getUsers);

// Update User (admin and authorized user)
router.put("/:userId", verifyTokenAndAuthorization, updateUser);

// delete the user (admin and authorized user)
router.delete("/:userId", verifyTokenAndAuthorization, deleteUser);

// get single user (admin and authorized user)
router.get("/:userId", verifyTokenAndAuthorization, getUser);

module.exports = router;
