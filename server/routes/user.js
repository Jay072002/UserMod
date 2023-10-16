const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} = require("../controller/user");

const router = require("express").Router();

// Create User

router.post("/", createUser);

// Get All Users
router.get("/", getUsers);

// Update User
router.put("/:userId", updateUser);

// delete the user
router.delete("/:userId", deleteUser);

// get single user
router.get("/:userId", getUser);

module.exports = router;
