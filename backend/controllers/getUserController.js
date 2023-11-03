const User = require("../models/userModel");

exports.getUser = async (req, res) => {
    const query = { username: req.params.username }
    
  try {
    const user = await User.findOne(query);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}