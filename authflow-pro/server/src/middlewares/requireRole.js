export const requireRole = (allowedRoles = []) => {
  return (req, res, next) => {
    /*
      req.user is already set by verifyToken middleware
      Example:
      req.user = { userId, email, role }
    */

    if (!req.user) {
      return res.status(401).json({
        status: "failure",
        message: "Unauthorized",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failure",
        message: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};
