import express from 'express'

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

function getRoutes() {
  const router = express.Router()

  router.use("/auth", authRoute);
  router.use("/user", userRoute);

  return router
}

export {getRoutes}