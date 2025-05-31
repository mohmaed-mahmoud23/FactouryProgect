const express = require("express");

const { SignUp, LogIn } = require("../controller/auth");
const {
  SignUpValidator,
  LogInValidator,
} = require("../utils/validators/autValidator");

const router = express.Router();

router.post("/signup", SignUp);
router.post("/login", LogIn);

module.exports = router;
