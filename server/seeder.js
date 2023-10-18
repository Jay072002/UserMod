const { hashPassword } = require("./utils/helpers/bcrypt");
const { generateToken } = require("./utils/helpers/jwt");
const { ADMIN_EMAIL, ADMIN_PASSWORD } = require("./utils/constants/constants");
const User = require("./models/User");

// create a admin user
const seeder = async () => {
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

    console.log("admin account created");
  } catch (error) {
    console.log("Error While Creating Seeder User", error);
    throw new Error("Error While Creating Seeder User");
  }
};

module.exports = seeder;
