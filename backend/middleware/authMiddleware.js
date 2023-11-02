// This function checks if a user is logged in and authorized to access a protected route
const protect = (req, res, next) => {
    console.log("user", req.session.user);
    // If the user's session exists, they are authorized to access the protected route and the next middleware function is called
    if (req.session.user) {
      next();
    } else {
      res.status(401).json({
        status: "fail",
        message: "You are not logged in!",
      });
    }
  };
  module.exports = protect;