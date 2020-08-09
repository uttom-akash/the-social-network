const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(401);
    } else {
      next();
    }
  };
};

module.exports = authorize;
