const jwt = require("jsonwebtoken");
const { User, Group } = require("../models");
const { jsonData, decodedToken, checkExpiredToken } = require("../utils");
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // const refreshToken = req.cookies.refreshToken;
  if (token) {
    const serectKey = process.env.JWT_ACCESS_KEY;
    const accessToken = token.split(" ")[1];
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

const verifyTokenRefresh = (req, res, next) => {
  //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
  const codeRefresh = req.body.refreshToken || "";
  const serectKey = process.env.JWT_REFRESH_KEY;
  const refreshToken = codeRefresh || codeRefresh.split(" ")[1];
  if (codeRefresh) {
    const refreshExp = decodedToken(refreshToken)?.exp;
    const user_id = decodedToken(refreshToken)?.user_id;
    const refreshExpired = checkExpiredToken(refreshExp);
    if (refreshExpired) {
      return res
        .status(500)
        .json(jsonData(false, "Refresh token was expired!"));
    }
    jwt.verify(refreshToken, serectKey, async (err, item) => {
      if (err) {
        return res.status(403).json("Refresh token is not valid!");
      }
      req.user_id = user_id;
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
const verifyTokenAndOwnerOfGroup = (req, res, next) => {
  verifyToken(req, res, async () => {
    const group = await Group.findOne({ where: { userId: req.user.id } });
    if (!group) {
      return res.status(500).json("You're not in Group!");
    }
    const owner = req.user.id == group?.userId;
    const admin = owner && req.user.roleId == 1;
    if (admin || owner) {
      next();
    } else {
      return res.status(403).json("You're not allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndUserAuthorization,
  verifyTokenAndOwnerOfGroup,
  verifyTokenAndAdmin,
  verifyTokenRefresh,
};
