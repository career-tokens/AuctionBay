const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    //hashes the password and creates a new user
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect password",
      });
    }
    req.session.user = user;
    res.status(200).json({
      status: "success",
      data: req.session.user.username,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
}; // check if user is logged in
exports.isLoggedIn = (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      status: "success",
      data: {
        user: req.session.user,
      },
    });
  } else {
    res.status(401).json({
      status: "fail",
      message: "You are not logged in!",
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        status: "fail",
        message: err,
      });
    }
    res.status(200).json({
      status: "success",
    });
  });
};