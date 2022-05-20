const express = require("express");

const authRoute = require("./auth");
const userRoute = require("./user");

const getRoutes = () => {
  const router = express.Router();

  router.use("/auth", authRoute);
  router.use("/users", userRoute);

  return router;
};

module.exports = { getRoutes };
