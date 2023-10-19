// Middleware function for user creation and update
const validateUserData = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { stripUnknown: true });

    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((detail) => detail.message) });
    }

    req.body = value;
    next();
  };
};

module.exports = validateUserData;
