const Address = require("../models/Address");
const User = require("../models/User");

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

module.exports = {
  addAddress,
  updateAddress,
};
