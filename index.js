const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const { getRoutes } = require("./routes/index");
const { services } = require("./services");

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded())
app.use(express.json());

//services
services();
//ROUTES
app.use("/api", getRoutes());

const port = process.env.PORT || 8000;
try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.log(`Server is down errors: ${error}`);
}
