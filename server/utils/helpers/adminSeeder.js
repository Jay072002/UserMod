const { hashPassword } = require("./bcrypt");
const { generateToken } = require("./jwt");
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("../constants/constants");
const User = require("../../models/User");

// create a admin user
const adminSeeder = async () => {
  // create a seeder user and assign a token when server starts

  try {
    const isSeederUserCreated = await User.findOne({
      email: ADMIN_EMAIL,
    });

    if (isSeederUserCreated) {
      return;
    }

    const hashedPassword = await hashPassword(ADMIN_PASSWORD);

    const seederUser = {
      firstName: "admin",
      lastName: "user",
      email: ADMIN_EMAIL,
      isAdmin: true,
      password: hashedPassword,
    };

    await User.create(seederUser);

    console.log("ADMIN ACCOUNT CREATED");
  } catch (error) {
    console.log("Error While Creating Seeder User", error);
    throw new Error("Error While Creating Seeder User");
  }
};

module.exports = adminSeeder;
