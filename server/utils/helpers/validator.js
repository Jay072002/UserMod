const Joi = require("joi");

// Sanitize the Request Payload

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@_()]{8,20}$"))
    .required(),
});

// Joi schema for user creation
const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@_()]{8,20}$"))
    .required(),
  addresses: Joi.array().items(
    Joi.object({
      street: Joi.string(),
      city: Joi.string(),
      zipCode: Joi.number().integer().allow(null),
      state: Joi.string(),
    })
  ),
});

// Joi schema for updating user information
const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10}$")),
});

// Joi schema for address creation
const createAddressSchema = Joi.object({
  street: Joi.string().allow(""),
  city: Joi.string().allow(""),
  zipCode: Joi.string().pattern(new RegExp("^[0-9]{6}$")).allow(""),
  state: Joi.string().allow(""),
});

// Joi schema for updating an address
const updateAddressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  zipCode: Joi.string().pattern(new RegExp("^[0-9]{6}$")).allow(null),
  state: Joi.string(),
});

module.exports = {
  loginUserSchema,
  createUserSchema,
  updateUserSchema,
  createAddressSchema,
  updateAddressSchema,
};
