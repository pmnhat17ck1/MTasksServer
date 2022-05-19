const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_ACCESS_KEY,
      { }
    );
  }

const  generateRefreshToken = (user) => {
    return jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "5m" }
    );
  }

module.exports = {
  generateAccessToken,
  generateRefreshToken
};
