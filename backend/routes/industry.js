const express = require("express");

const {
  creatIndustry,
  getAllIndustry,
  getOneIndustry,
  updateIndustry,
  deleteIndustry,
  UploadIndustryImage,
  ResizeIndustryImage,
} = require("../controller/industry");

const AuthService = require("../controller/auth");

const router = express.Router();
router.use(AuthService.Protect);

router
  .route("/")
  .post(UploadIndustryImage, ResizeIndustryImage, creatIndustry)
  .get(getAllIndustry);
router
  .route("/:id")
  .get(getOneIndustry)
  .put(UploadIndustryImage, ResizeIndustryImage, updateIndustry)
  .delete(deleteIndustry);
module.exports = router;
