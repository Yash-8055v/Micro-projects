export const authorizeRole = (allowedRoles) => { //* allowedRoles is an array

  return (req, res, next) => {

    // Safety check (verifyToken should have run before)
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        status: "failure",
        message: "Unauthorized"
      });
    }

    // Check if user's role is allowed
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: "failure",
        message: "Access denied"
      });
    }

    // Role allowed → continue
    next();
  };

};