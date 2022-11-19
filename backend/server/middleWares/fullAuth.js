const { isTokenValid } = require("../../utils/jwt");
const authenticateUser = async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }
  // check cookies
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    res.status(400).json({
      success: false,
      message: "Authentication invalid",
    });
  }

  try {
    const payload = isTokenValid(token);

    // Attach the user and his permissions to the req object
    req.user = {
      userId: payload.user.userId,
      role: payload.user.role,
    };
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Authentication invalid",
    });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(409).json({
        success: false,
        message: "Unauthorized to access this route",
      });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
