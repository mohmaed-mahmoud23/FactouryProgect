const path = require("path");
const express = require("express");
const dbconnection = require("./config/database");
const cors = require("cors");

const AdminRoute = require("./routes/Admin");
const AuthRoute = require("./routes/auth");
const industryRoute = require("./routes/industry");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.use("/api/users", AdminRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/industry", industryRoute);

dbconnection();

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
