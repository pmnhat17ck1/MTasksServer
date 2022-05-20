const jwt = require("jsonwebtoken");

const generateAccessToken = (object) => {
    return jwt.sign(
      {
        ...object,
      },
      process.env.JWT_ACCESS_KEY,
      { }
    );
  }

const  generateRefreshToken = (object) => {
    return jwt.sign(
      {
        ...object,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "5m" }
    );
  }

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
