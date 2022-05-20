const jwt = require("jsonwebtoken");

const generateAccessToken = (object, exp = "365d") => {
  const serectKey = process.env.JWT_ACCESS_KEY;
  return jwt.sign(
    {
      ...object,
    },
    serectKey,
    { expiresIn: exp }
  );
};

const generateRefreshToken = (object, exp = 3600) => {
  const serectKey = process.env.JWT_REFRESH_KEY;
  return jwt.sign(
    {
      ...object,
    },
    serectKey,
    { expiresIn: exp }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
