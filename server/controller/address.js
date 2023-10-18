const Address = require("../models/Address");
const User = require("../models/User");

// create a address and push the address id in the user model addresses field
const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const addressBody = req.body;

    // Create a new address
    const address = new Address({ user: userId, ...addressBody });
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.addresses.push(address); // Push the address object, not just the body

    await address.save();
    await user.save();

    res.status(200).json({ message: "Address added successfully", user });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ error: "Could not add the address" });
  }
};

// update the specific address of user
const updateAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const updatedAddress = req.body;

    const address = await Address.findByIdAndUpdate(addressId, updatedAddress, {
      new: true,
    });

    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ error: "Could not update the address" });
  }
};

// delete the address of the user and also from the user model remove the address id
const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;

    const { user: userId } = await Address.findById(addressId).select("user");

    // if there is address then delete the address and the address from user
    if (userId) {
      await Address.deleteOne({ _id: addressId });

      const user = await User.findById(userId);

      // find the index of the address in the user's addresses array
      const addressIndex = user.addresses.indexOf(addressId);

      // if the address exists in the user's addresses, then remove it
      if (addressIndex !== -1) {
        user.addresses.splice(addressIndex, 1);
        await user.save();
      }
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    console.error("Error Deleting address:", error);
    res.status(500).json({ error: "Could not Delete the address" });
  }
};

// get addresses of the particular user
const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    const addresses = await Address.find({ user: userId });
    res.status(200).json(addresses);
  } catch (error) {
    console.error("Error Getting address:", error);
    res.status(500).json({ error: "Could not Get addresses" });
  }
};

module.exports = {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
};
