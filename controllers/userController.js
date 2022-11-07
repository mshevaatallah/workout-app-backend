const User = require("../models/userModels");

const loginUser = async (req, res) => {
  res.json({ mssg: "login" });
};

const registerUser = async (req, res) => {
  res.json({ mssg: "register" });
};

module.exports = { loginUser, registerUser };
