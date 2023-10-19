const User = require("../models/User");
const Address = require("../models/Address");
const { hashPassword } = require("../utils/helpers/bcrypt");

// Create a new user or if address is provided then create address too
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;
    let addresses = req.body.addresses || [];

    // check if the email exist in the db already
    const isAlreadyRegistered = await User.findOne({ email });

    if (isAlreadyRegistered) {
      return res.status(400).json({ error: "User Already Exist!" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await hashPassword(password);

    // Create the user
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await user.save();

    if (addresses.length > 0) {
      const addressPromises = addresses.map(async (address) => {
        const { title, ...restAddress } = address;
        const newAddress = new Address({ ...restAddress, user: user._id });

        await newAddress.save();

        user?.addresses?.push(newAddress._id);

        return newAddress;
      });

      await Promise.all(addressPromises);

      await user.save();
    }

    const { password: hashedPass, ...restUser } = user._doc;

    res.status(201).json({ message: "User created successfully", restUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Could not create the user" });
  }
};

// Get all users (paginated, without password and addresses)
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query?.page) || 1; // Current page, default to 1
    const limit = parseInt(req.query?.limit) || 10; // Number of users per page, default to 10

    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password -addresses")
      .skip(skip)
      .limit(limit);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Could not fetch users" });
  }
};

// Update user information (user only)
const updateUser = async (req, res) => {
  try {
    const userId = req.params?.userId;
    const requestBody = req.body;

    if (requestBody?.password) {
      return res.status(422).json({ error: "Unprocessable Entity" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, requestBody, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...restUser } = updatedUser._doc;
    console.log(restUser, "rest");
    res
      .status(200)
      .json({ message: "User updated successfully", user: restUser });
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

    const { password, ...restUser } = user?._doc;

    res.status(200).json({ user: restUser, addresses });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Could not get the user" });
  }
};

// delete a user and the addresses associated with that user
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // check if the user exists before deleting
    const isExist = await User.findById(userId);

    if (!isExist) {
      return res.status(400).json({ error: "User Does Not Exists" });
    }

    // First, delete the user
    await User.deleteOne({ _id: userId });

    // Next, delete the associated addresses
    await Address.deleteMany({ user: userId });

    res
      .status(200)
      .json({ message: "User and associated addresses deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Could not delete the user" });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  getUser,
  deleteUser,
};
