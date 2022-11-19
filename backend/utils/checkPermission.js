const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  res.status(409).json({
    success: false,
    message: "Not authorized to access this route",
  });
};
module.exports = checkPermissions;
