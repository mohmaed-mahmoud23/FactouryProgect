const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const { Uploadsinglimage } = require("../middlewares/uploadimagesmiddleware");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");

const User = require("../models/UserSchema");
const factory = require("./handlerfactory");
// middleware
exports.UploadUserImage = Uploadsinglimage("profileImage");
exports.ResizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      // dieminsion
      .resize(200, 200)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);
    // upload image name to our datebase
    req.body.profileImage = filename;
  }
  next();
});
// @desc  create user
// @route post/api/users
// @access private
exports.createUser = factory.createone(User);

// @desc  get all list of users
// @route get /api/users
// @acess private
exports.getUsers = factory.getall(User);

// @desc  get a specific  brand by id
// @route get /api/brand/:id
// @acess private
exports.getUser = factory.getone(User);

// @desc  update a specific user id
// @route put /api/users/:id
// @acess private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await User.findByIdAndUpdate(
    req.params.id,
    {
      role: req.body.role,
      active: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(new ErrorResponse(`User not found`, 404));
  }
  res.status(200).json({ data: document });
});

// @desc  delete a specific user by id
// @route delate /api/users/:id
// @acess private
exports.deleteUser = factory.deleteone(User);

// @desc  get logged user data
// @route delate /api/users/getMe
// @acess private/protected

exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

// });

exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  // gernerate token
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

// @desc updpatelogged user data   (wihout password,role)
// @route delate /api/users/Updateme
// @acess private/protected
exports.updateLoggedUserdata = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      profileImage: req.body.profileImage,
      phone: req.body.phone,
    },
    {
      new: true,
    }
  );
  res.status(200).json({ data: user });
});
