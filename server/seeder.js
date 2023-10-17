const { hashPassword } = require("./helpers/bcrypt");
const { generateToken } = require("./helpers/jwt");
const User = require("./models/User");
// create a admin user

const seeder = async () => {
  // create a seeder user and assign a token when server starts

  try {
    const isSeederUserCreated = await User.findOne({
      email: "admin@gmail.com",
    });

    if (isSeederUserCreated) {
      return;
    }

    const password = "admin@123";

    const hashedPassword = await hashPassword(password);

    const seederUser = {
      firstName: "admin",
      lastName: "user",
      email: "admin@gmail.com",
      isAdmin: true,
      password: hashedPassword,
    };

    await User.create(seederUser);

    console.log("seeder admin created");
  } catch (error) {
    console.log("Error While Creating Seeder User", error);
    throw new Error("Error While Creating Seeder User");
  }
};

module.exports = seeder;
