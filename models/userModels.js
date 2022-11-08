const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("email dan password wajib di isi");
  }
  if (!validator.isEmail(email)) {
    throw Error("email tidak valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password kurang aman");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email sudah digunakan");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("email dan password wajib di isi");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Email salah !");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Password salah !");
  }
  return user;
};
module.exports = mongoose.model("User", userSchema);
