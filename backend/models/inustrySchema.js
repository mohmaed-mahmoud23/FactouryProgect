const mongoose = require("mongoose");

const industrySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    images: [String],
    logo: String,
    location: String,
    contact: String,
    email: String,
    website: String,
    phone: String,
    address: String,

    goverment: String,

    typeOfProduct: String,
  },
  { timestamps: true }
);
const SetImageUrl = (doc) => {
  if (doc.image) {
    const ImageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.image = ImageUrl;
  }
  if (doc.images) {
    doc.imagesList = [];
    // forEach is a fuction
    doc.images.forEach((image) => {
      const ImageUrl = `${process.env.BASE_URL}/products/${image}`;
      doc.imagesList.push(ImageUrl);
    });
    doc.images = doc.imagesList;
  }
};

industrySchema.post("init", function (doc) {
  SetImageUrl(doc);
});

industrySchema.post("save", (doc) => {
  SetImageUrl(doc);
});
module.exports = mongoose.model("industry", industrySchema);
