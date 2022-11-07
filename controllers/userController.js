const loginUser = (req, res) => {
  res.json({ msg: "login" });
};

const registerUser = (req, res) => {
  res.json({ msg: "register" });
};

module.exports = { loginUser, registerUser };
