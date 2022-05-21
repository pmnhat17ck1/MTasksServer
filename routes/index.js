const express = require("express");
const functionController = require("../controllers/functionController");
const { verifyTokenRefresh } = require("../middleware/verifyToken");

const authRoute = require("./auth");
const userRoute = require("./user");
const countryRoute = require("./country");
const priorityRoute = require("./priority");
const roleRoute = require("./role");
const stepRoute = require("./step");
const groupRoute = require("./group");


const getRoutes = () => {
  const router = express.Router();
  router.post("/forgetPassword", functionController.forgetPassword);
  router.post(
    "/changePassword",
    verifyTokenRefresh,
    functionController.changePassword
  );
  router.use("/auth", authRoute);
  router.use("/users", userRoute);
  router.use("/countries", countryRoute);
  router.use("/priorities", priorityRoute);
  router.use("/roles", roleRoute);
  router.use("/steps", stepRoute);
  router.use("/groups", groupRoute);

  return router;
};

module.exports = { getRoutes };
