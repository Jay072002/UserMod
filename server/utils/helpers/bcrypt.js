const bcrypt = require("bcrypt");

// Convert the plain password into hash for privacy
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    console.error("Error Hashing Password:", error);
    res.status(500).json({ error: "Could not Hash Password" });
  }
};

// Compare the plain password with the password stored in the db
const comparePassword = async (password, hashPass) => {
  try {
    const isMatched = await bcrypt.compare(password, hashPass);

    return isMatched;
  } catch (error) {
    console.error("Error Comapring Password:", error);
    res.status(500).json({ error: "Could Not Compare The Password" });
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
