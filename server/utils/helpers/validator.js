const Joi = require("joi");

// Joi schema for user creation
const createUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number().integer(),
  password: Joi.string().required(),
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
  phoneNumber: Joi.number().integer(),
});

// Joi schema for address creation
const createAddressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  zipCode: Joi.number().integer().allow(null),
  state: Joi.string().required(),
});

// Joi schema for updating an address
const updateAddressSchema = Joi.object({
  street: Joi.string(),
  city: Joi.string(),
  zipCode: Joi.number().integer().allow(null),
  state: Joi.string(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  createAddressSchema,
  updateAddressSchema,
};
