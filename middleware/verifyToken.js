const jwt = require("jsonwebtoken");
const { User } = require("../models");
const verifyToken = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const token = req.headers.token;
  // const refreshToken = req.cookies.refreshToken;

  if (token) {
    const serectKey = process.env.JWT_ACCESS_KEY;
    const accessToken = token || token.split(" ")[1];
    jwt.verify(accessToken, serectKey, async (err, item) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }
      const user = await User.findOne({
        where: {
          id: item.user_id,
        },
      });
      if (!user) {
        return res.status(500).json("Can't find user!");
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You're not authenticated");
  }
};

const verifyTokenAndUserAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id == req.params.id) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.roleId === 1) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!");
    }
  });
};
module.exports = {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndAdmin,
};
