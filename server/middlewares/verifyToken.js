const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  const secretKey = process.env.SECRETKEY;
  try {
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is invalid" });
      }
      req.user = decoded;

      next();
    });
  } catch (error) {
    console.log("Error While Verifying Token", error);
    return res.status(500).json({ message: "Error While Verifying Token" });
  }
};

function verifyTokenAndUser(req, res, next) {
  verifyToken(req, res, () => {
    const userId = req.params.userId; //params userId
    const id = req.user.id; //the loggen in user id
    if (userId && userId !== id) {
      return res.status(403).json({ message: "Token does not match the user" });
    }
    next();
  });
}

function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (!req?.user?._doc?.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only Admin Can Perform This Action" });
    }

    next();
  });
}

function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    const userId = req.params.userId; //params userId
    const id = req.user.id; //the loggen in user id
    if ((userId && userId !== id) || req?.user?._doc?.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Only Authorized Users Can Perform This" });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndUser,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
};
