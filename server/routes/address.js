const { addAddress, updateAddress } = require("../controller/address");

const router = require("express").Router();

// all address routes goes here

// update address
router.put("/:addressId", updateAddress);

// create address
router.post("/:userId", addAddress);

module.exports = router;
