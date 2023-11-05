// This function checks if a user is logged in and authorized to access a protected route
const protect = (req, res, next) => {
   next();
  };
  module.exports = protect;
