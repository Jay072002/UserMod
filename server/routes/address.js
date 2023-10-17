const {
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controller/address");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

const router = require("express").Router();

// all address routes goes here

// update address
router.put("/:addressId", verifyTokenAndAuthorization, updateAddress);

// create address
router.post("/:userId", verifyTokenAndAuthorization, addAddress);

// delete address
router.delete("/:addressId", verifyTokenAndAuthorization, deleteAddress);

module.exports = router;
