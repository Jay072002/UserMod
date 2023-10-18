const { comparePassword } = require("../utils/helpers/bcrypt");
const { generateToken } = require("../utils/helpers/jwt");
const User = require("../models/User");

// loging the user with credentials
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user is registered
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User Not Registered" });
    }

    // If the user is registered, check the login credentials
    const isPasswordValid = await comparePassword(password, user?.password);

    const { password: extractedPass, ...payload } = user;

    if (isPasswordValid) {
      const token = await generateToken(payload);

      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(200).json({ token, payload });
    } else {
      res.status(401).json({ error: "Invalid Password" });
    }
  } catch (error) {
    console.error("Error Login User:", error);
    res.status(500).json({ error: "Could not login the user" });
  }
};

module.exports = {
  loginUser,
};
