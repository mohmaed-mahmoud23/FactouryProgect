const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const {
  UploadArrayofImages,
} = require("../middlewares/uploadimagesmiddleware");

const Industsry = require("../models/inustrySchema");
const factory = require("./handlerfactory");

exports.UploadIndustryImage = UploadArrayofImages([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);
// apply image processing  middelware by using memory storage buffer
exports.ResizeIndustryImage = asyncHandler(async (req, res, next) => {
  // console.log(req.files)
  // image processing for imageCover
  if (req.files.image) {
    const imageCoverFileName = `industry-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.image[0].buffer)
      // dieminsion
      .resize(2000, 2000)
      .toFormat("jpeg")
      .jpeg({ quality: 85 })
      .toFile(`uploads/industry/${imageCoverFileName}`);
    // upload image name to our datebase
    req.body.image = imageCoverFileName;
  }
  // image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (imag, index) => {
        const ImagesFileName = `industries-${uuidv4()}-${Date.now()}-${
          index + 1
        }.jpeg`;
        await sharp(imag.buffer)
          .resize(2000, 2000)
          .toFormat("jpeg")
          .jpeg({ quality: 85 })
          .toFile(`uploads/industry/${ImagesFileName}`);
        // upload image name to our datebase
        req.body.images.push(ImagesFileName);
      })
    );
  }
  next();
});

exports.creatIndustry = factory.createone(Industsry);

exports.getAllIndustry = factory.getall(Industsry);

exports.getOneIndustry = factory.getone(Industsry);

exports.updateIndustry = factory.updateone(Industsry);

exports.deleteIndustry = factory.deleteone(Industsry);
