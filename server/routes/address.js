const {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
} = require("../controller/address");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/verifyToken");

const router = require("express").Router();

// all address routes goes here

// update address (only admin and authorized user)
router.put("/:addressId", verifyTokenAndAuthorization, updateAddress);

// create address (only admin and authorzed user)
router.post("/:userId", verifyTokenAndAuthorization, addAddress);

// delete address (only admin and authorized user)
router.delete("/:addressId", verifyToken, deleteAddress);

// get all addresses (only admin and authorized user)
router.get("/:userId", verifyTokenAndAuthorization, getAddresses);

module.exports = router;
