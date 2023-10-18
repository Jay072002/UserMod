const JOI = require("joi");

// { email, password }

const authSchema = JOI.object({
  email: JOI.string().email().required(),
  password: JOI.string().min(3).max(15),
});

// { firstName, lastName, email, phoneNumber, password }

const createUserSchema = JOI.object({
  firstName: JOI.string().lowercase().min(3),
  lastName: JOI.string().lowercase().min(3),
  email: JOI.string().email().required(),
  phoneNumber: JOI.number().min(10).max(10),
  password: JOI.string().min(3).max(15),
});
