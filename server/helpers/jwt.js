const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  try {
    const secretKey = process.env.SECRETKEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    return token;
  } catch (error) {
    console.log("Could Not Generate Token", error);
    throw new Error("Could not generate token");
  }
};

module.exports = { generateToken };
