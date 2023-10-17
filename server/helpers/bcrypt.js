const bcrypt = require("bcrypt");

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
