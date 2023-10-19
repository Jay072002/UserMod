const jwt = require("jsonwebtoken");

// verify user token
const verifyToken = (req, res, next) => {
  const { token } = req.cookies;
  const secretKey = process.env?.SECRETKEY;
  try {
    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is invalid" });
      }

      req.user = decoded; //store the user's payload in the req.user
      next();
    });
  } catch (error) {
    console.log("Error While Verifying Token", error);
    return res.status(500).json({ message: "Error While Verifying Token" });
  }
};

// Only authorize user can access further
function verifyTokenAndUser(req, res, next) {
  verifyToken(req, res, () => {
    const userId = req?.params?.userId; //params userId
    const id = req.user?.id; //the loggen in user id

    if (userId && userId !== id) {
      return res.status(403).json({ message: "Token does not match the user" });
    }
    next();
  });
}

// Only admin can access further
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (!req?.user?.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only Admin Can Perform This Action" });
    }

    next();
  });
}

// Only admin and authorize user can access further
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    const userId = req?.params?.userId; //params userId
    const id = req?.user?._id; //the loggen in user id

    // allow admin and authorized user to access
    if ((userId && userId === id) || req?.user?.isAdmin) {
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
