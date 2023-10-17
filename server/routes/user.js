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

// Create User

router.post("/", verifyTokenAndAdmin, createUser);

// Get All Users
router.get("/", verifyToken, getUsers);

// Update User
router.put("/:userId", updateUser);

// delete the user
router.delete("/:userId", verifyTokenAndAuthorization, deleteUser);

// get single user
router.get("/:userId", verifyTokenAndAdmin, getUser);

module.exports = router;
