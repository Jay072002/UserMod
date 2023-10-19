const { USERS } = require("../constants/constants");
const User = require("../../models/User");
const { hashPassword } = require("../helpers/bcrypt");

const userSeeder = async () => {
  try {
    let repeatedUsers = 0;

    for (let user of USERS) {
      const isExist = await User.findOne({ email: user?.email });

      if (!isExist) {
        // Hash the password before saving it to the database
        const hashedPassword = await hashPassword(user["password"]);

        user["password"] = hashedPassword;
        await User.create(user);
      } else {
        repeatedUsers += 1;
      }
    }

    console.log(`${repeatedUsers} REPEATED USERS`);
    console.log("USERS SEEDER EXECUTED SUCCESSFULLY");
  } catch (error) {
    console.log(error);
    throw new Error("ERROR WHILE EXECUTING USERSEEDER FUNCTION");
  }
};

module.exports = userSeeder;
