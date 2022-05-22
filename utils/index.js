const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { Notification } = require("../models");
const userRes = (ob) => {
  let { password, ...userNew } = ob || {};
  return userNew;
};
const jsonData = (success = "", data = "") => {
  return { success: success, data: data };
};
const hashPasword = async (password = "") => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};
const comparePasword = async (password1 = "", password2 = "") => {
  const validPassword = await bcrypt.compare(password1, password2);
  return validPassword;
};
const decodedToken = (token) => {
  const decodedToken = jwt.decode(token, {
    complete: true,
  });

  if (!decodedToken) {
    throw new Parse.Error(
      Parse.Error.OBJECT_NOT_FOUND,
      `provided token does not decode as JWT`
    );
  }
  return decodedToken?.payload;
};

const checkExpiredToken = (exp = 0) => {
  return Date.now() >= exp * 1000;
};
const codeActivation = crypto.randomBytes(3).toString("hex").toUpperCase();

const createNoti = async (title='', description='', type='', userId='') => {
  return await Notification.create({
    title: title,
    description: description,
    type: type,
    userId: userId,
  });
};

module.exports = {
  userRes,
  jsonData,
  decodedToken,
  checkExpiredToken,
  hashPasword,
  comparePasword,
  codeActivation,
  createNoti,
};
