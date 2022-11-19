const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    res.status(400).json({ success: false, message: "Authentication Invalid" });
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Authentication Invalid" });
  }
};

const authorizePermissions = (...roles) => {
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

module.exports = {
  authenticateUser,
  authorizePermissions,
};
