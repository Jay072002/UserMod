const User = require("../models/User");
const Address = require("../models/Address");

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber } = req.body;

    let addresses = req.body.addresses || [];

    // Create the user
    const user = new User({ firstName, lastName, email, phoneNumber });
    await user.save();

    if (addresses.length > 0) {
      const addressPromises = addresses.map(async (address) => {
        const newAddress = new Address({ ...address, user: user._id });
        return newAddress.save();
      });

      await Promise.all(addressPromises);
    }

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Could not create the user" });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Could not fetch users" });
  }
};

// Update user information
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Could not update the user" });
  }
};

// Get single user and addresses of the user
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // fetch user and addresses
    const user = await User.findById(userId);
    const addresses = await Address.find({ user: userId });

    res.status(200).json(user, addresses);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Could not get the user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    await User.deleteOne({ _id: userId });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Could not get the user" });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  getUser,
  deleteUser,
};
