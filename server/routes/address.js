const {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
} = require("../controller/address");
const validateUserData = require("../middlewares/validator");
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middlewares/verifyToken");
const {
  createAddressSchema,
  updateAddressSchema,
} = require("../utils/helpers/validator");

const router = require("express").Router();

// all address routes goes here

// get all addresses (only admin and authorized user)
router.get("/:userId", verifyTokenAndAuthorization, getAddresses);

// create address (only admin and authorzed user)
router.post(
  "/:userId",
  validateUserData(createAddressSchema),
  verifyTokenAndAuthorization,
  addAddress
);

// update address (only admin and authorized user)
router.put(
  "/:addressId",
  validateUserData(updateAddressSchema),
  verifyTokenAndAuthorization,
  updateAddress
);

// delete address (only admin and authorized user)
router.delete("/:addressId", verifyToken, deleteAddress);

module.exports = router;
