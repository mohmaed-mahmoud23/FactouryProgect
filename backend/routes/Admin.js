const express = require("express");

const {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  UploadUserImage,
  ResizeImage,
  getLoggedUserData,
  updateLoggedUserPassword,
  updateLoggedUserdata,
} = require("../controller/Admin");
const {
  createUserValidator,
  getUserValidator,
  deleteUserValidator,
  changeLoggedUserPasswordValidator,
  updateLoggedUserdataValidator,
} = require("../utils/validators/Uservalidator");

const AuthService = require("../controller/auth");

const router = express.Router();

router.use(AuthService.Protect); // apply protect  for all routes (admin and users)


// Users routes
router.get("/getMe", getLoggedUserData, getUser);
router.put(
  "/changeMyPassword",
  changeLoggedUserPasswordValidator,
  updateLoggedUserPassword
);
router.put(
  "/updateMe",
  updateLoggedUserdataValidator,
  UploadUserImage,
  ResizeImage,
  updateLoggedUserdata
);

// Admin routes
router.use(AuthService.allowedTo("admin")); // apply  authroiztion for all admin  routes

router
  .route("/")
  .post(UploadUserImage, ResizeImage, createUserValidator, createUser)
  .get(getUsers);
router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put( updateUser)
  .delete(deleteUserValidator, deleteUser);
module.exports = router;
