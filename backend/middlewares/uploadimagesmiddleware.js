const multer = require("multer");

exports.Uploadsinglimage = (fieldnameSchema) => {

  const multerstorage = multer.memoryStorage();
  // filtr middleware
  const multerfilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed", 404), false);
    }
  };

  const upload = multer({ storage: multerstorage, fileFilter: multerfilter });
  return upload.single(fieldnameSchema);
};

exports.UploadArrayofImages = (ArrayofFields) => {
  const multerstorage = multer.memoryStorage();
  // filtr middleware
  const multerfilter = function (req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only images allowed", 404), false);
    }
  };

  const upload = multer({ storage: multerstorage, fileFilter: multerfilter });
  return upload.fields(ArrayofFields);
};
