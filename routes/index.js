const express = require("express");
const functionController = require("../controllers/functionController");
const {
  verifyTokenRefresh,
  verifyToken,
} = require("../middleware/verifyToken");
const { check } = require("express-validator");

const authRoute = require("./auth");
const userRoute = require("./user");
const countryRoute = require("./country");
const priorityRoute = require("./priority");
const roleRoute = require("./role");
const stepRoute = require("./step");
const groupRoute = require("./group");
const imageRoute = require("./image");
const taskRoute = require("./task");
const typeRoute = require("./type");

const getRoutes = () => {
  const router = express.Router();
  router.post("/forgetPassword", functionController.forgetPassword);
  router.post("/forgetPassword/verify_otp", functionController.verify_otp);
  router.post(
    "/forgetPassword/resetPassword",
    [
      check("password")
        .isLength({ min: 8 })
        .withMessage("Password must be greater than 8"),
      check("passwordConfirm")
        .isLength({ min: 8 })
        .withMessage("Password confirm must be greater than 8"),
    ],
    functionController.resetPassword
  );

  router.post(
    "/changePassword",
    verifyTokenRefresh,
    functionController.changePassword
  );
  router.get("/dashboard", verifyToken, functionController.dashboard);

  router.use("/auth", authRoute);
  router.use("/users", userRoute);
  router.use("/countries", countryRoute);
  router.use("/priorities", priorityRoute);
  router.use("/roles", roleRoute);
  router.use("/steps", stepRoute);
  router.use("/groups", groupRoute);
  router.use("/images", imageRoute);
  router.use("/tasks", taskRoute);
  router.use("/types", typeRoute);

  return router;
};

module.exports = { getRoutes };
